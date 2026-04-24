const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Helper function to strictly validate the edge format
const isValidEdge = (edge) => {
    if (typeof edge !== 'string') return false;
    const trimmed = edge.trim();
    // Must be SingleUppercase->SingleUppercase
    if (!/^[A-Z]->[A-Z]$/.test(trimmed)) return false;
    
    const [u, v] = trimmed.split('->');
    return u !== v; // Check for self-loops (A->A)
};

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ 
                is_success: false, 
                message: "Invalid input. Expected JSON: { data: [...] }" 
            });
        }

        const invalid_entries = [];
        const duplicate_edges = [];
        const valid_edges = [];
        const seen_edges = new Set();
        const nodes = new Set();

        // 1. Validation & Deduplication
        for (const item of data) {
            if (!isValidEdge(item)) {
                invalid_entries.push(item);
                continue;
            }
            
            const edgeStr = item.trim();
            if (seen_edges.has(edgeStr)) {
                duplicate_edges.push(edgeStr);
            } else {
                seen_edges.add(edgeStr);
                const [u, v] = edgeStr.split('->');
                valid_edges.push({ u, v });
                nodes.add(u);
                nodes.add(v);
            }
        }

        // 2. Build Graph 
        const parent = {};
        const children = {};
        
        // Initialize children array for all nodes
        nodes.forEach(n => children[n] = []);

        for (const { u, v } of valid_edges) {
            // First edge wins: If node 'v' already has a parent, ignore new parent
            if (!parent[v]) {
                parent[v] = u;
                children[u].push(v);
            }
        }

        // 3. Find Roots (Nodes with no parent)
        const roots = [];
        for (const node of nodes) {
            if (!parent[node]) {
                roots.push(node);
            }
        }

        // 4. Build Trees and calculate depth
        const hierarchies = [];
        let total_trees = 0;
        let largest_tree_root = null;
        let max_overall_depth = -1;
        const visited = new Set();

        // Recursive DFS to build the tree structure
        const buildTree = (node, depth) => {
            visited.add(node);
            const treeNode = { node, depth, children: [] };
            let max_depth_here = depth;

            for (const child of children[node]) {
                const childResult = buildTree(child, depth + 1);
                treeNode.children.push(childResult.tree);
                max_depth_here = Math.max(max_depth_here, childResult.max_depth);
            }
            return { tree: treeNode, max_depth: max_depth_here };
        };

        for (const root of roots) {
            const { tree, max_depth } = buildTree(root, 1);
            hierarchies.push(tree);
            total_trees++;

            // Track the root of the tree that goes the deepest
            if (max_depth > max_overall_depth) {
                max_overall_depth = max_depth;
                largest_tree_root = root;
            }
        }

        // 5. Cycle Detection
        let total_cycles = 0;
        // Any nodes left unvisited must be part of an isolated cycle
        const unvisited = [...nodes].filter(n => !visited.has(n));
        
        if (unvisited.length > 0) {
            const cycleVisited = new Set();
            for (const node of unvisited) {
                if (!cycleVisited.has(node)) {
                    let curr = node;
                    while (curr && !cycleVisited.has(curr)) {
                        cycleVisited.add(curr);
                        curr = children[curr].length > 0 ? children[curr][0] : null;
                    }
                    total_cycles++;
                }
            }
            // Append the cycle indicator to our output array
            hierarchies.push({ 
                has_cycle: true, 
                message: "Cycle detected, returning empty tree for cyclic component" 
            });
        }

        // 6. Final JSON Response formatting
        res.status(200).json({
            user_id: "amandeepsingh_01102006",
            email_id: "as5222@srmist.edu.in",
            college_roll_number: "RA2311003011425",
            hierarchies,
            invalid_entries,
            duplicate_edges,
            summary: {
                total_trees,
                total_cycles,
                largest_tree_root
            }
        });

    } catch (error) {
        console.error("API Processing Error:", error);
        res.status(500).json({ is_success: false, message: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
