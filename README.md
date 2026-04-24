# 🚀 SRM Full Stack Engineering Challenge – Solution

## 📌 Overview

This project is a solution to the **SRM Full Stack Engineering Challenge**.
It implements a REST API (`POST /bfhl`) that processes hierarchical node relationships and returns structured insights.

The project also includes a simple frontend interface to interact with the API.

---

## 🎯 Objective

* Accept an array of node relationships (e.g., `"A->B"`)
* Validate inputs
* Construct hierarchical trees
* Detect cycles
* Identify invalid and duplicate entries
* Return a structured JSON response

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Frontend:** HTML, CSS, JavaScript
* **Deployment:** Render / Vercel / Netlify

---

## 📁 Project Structure

```
project/
│── server.js        # Backend API
│── index.html       # Frontend UI
│── package.json     # Dependencies
│── README.md        # Documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd project
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Run the server

```
node server.js
```

Server will run at:

```
http://localhost:3000
```

---

## 🔗 API Endpoint

### ➤ POST `/bfhl`

### Request Body:

```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

---

## 📤 Response Format

```json
{
  "user_id": "yourname_ddmmyyyy",
  "email_id": "your@email.com",
  "college_roll_number": "your_roll",
  "hierarchies": [],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 0,
    "total_cycles": 0,
    "largest_tree_root": ""
  }
}
```

---

## 🧠 Approach

1. **Validation**

   * Ensure format `X->Y`
   * Reject invalid inputs (numbers, wrong format, self-loops)

2. **Deduplication**

   * Track edges using a Set
   * Store duplicates separately

3. **Graph Construction**

   * Build parent-child relationships

4. **Tree Formation**

   * Identify root nodes (nodes not appearing as child)

5. **Cycle Detection**

   * Use DFS with recursion stack

6. **Depth Calculation**

   * Longest path from root to leaf

7. **Summary Generation**

   * Count trees and cycles
   * Find largest tree root

---

## 🧪 Sample Input

```json
{
  "data": [
    "A->B", "A->C", "B->D", "C->E", "E->F",
    "X->Y", "Y->Z", "Z->X",
    "P->Q", "Q->R",
    "G->H", "G->H", "G->I",
    "hello", "1->2", "A->"
  ]
}
```

---

## ✅ Features

* ✔ Input validation
* ✔ Duplicate handling
* ✔ Cycle detection
* ✔ Multiple tree support
* ✔ Depth calculation
* ✔ Clean JSON response
* ✔ Simple frontend UI

---

## 🌐 Frontend Usage

* Open `index.html`
* Enter node data
* Click **Submit**
* View structured output

---

## 🚀 Deployment

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Add start command:

```
node server.js
```

---

### Frontend (Netlify / Vercel)

* Upload `index.html`

---

## ⚠️ Important Notes

* API supports up to 50 nodes within 3 seconds
* CORS should be enabled for cross-origin requests
* Do not hardcode responses

---

## 👤 Author Details

* **Name:** Your Name
* **Email:** [your@email.com](mailto:your@email.com)
* **Roll Number:** your_roll

---

## 📌 Conclusion

This project demonstrates the ability to:

* Build scalable REST APIs
* Handle complex data structures
* Implement graph-based algorithms
* Deliver full-stack solutions

---

⭐ *Thank you for reviewing this submission!*
