API Database Mini Apps
Author
Mary Fobbs‑Guillory

Table of Contents
Introduction

Features

Prerequisites

Installation

Usage

Screenshots

Collaborators

Credits

Introduction
API Database Mini Apps is a collection of eight small web applications, each powered by a different public API. The project was designed to strengthen my understanding of fetching, organizing, and displaying external data using JavaScript while maintaining a clean, responsive layout.

The grid structure was built with HTML, styled with CSS, and made interactive with JavaScript. One of the biggest challenges was managing a large .js file full of API calls and troubleshooting syntax errors across so many functions. Using GitHub Copilot in VS Code helped streamline the code and keep the logic organized.

Another major challenge was finding reliable, truly public APIs. Many “free” APIs require account creation, API keys, or subscriptions. Some older public endpoints are no longer maintained or have been taken offline entirely. This meant researching, testing, and replacing several APIs to ensure the mini apps worked without requiring users to sign up for multiple services.

In the future, I plan to enhance the interactive experience by adding animated transitions and more dynamic UI elements.

Features
Eight mini apps powered by eight different APIs

Responsive grid layout built with HTML & CSS

JavaScript fetch requests to retrieve and display API data

Organized data structures for readability and maintainability

Error‑handling for API calls

Clean, simple UI for quick browsing and interaction

Prerequisites
Before running this project, ensure you have:

Node.js and npm installed

A code editor such as VS Code

Git installed on your machine

Installation
To access and run this project locally, follow these steps in your terminal:

bash
git clone https://github.com/mfobbsie/JavaScriptAPIs
cd JavaScriptAPIs
npm install
npm start
Usage
Once the development server starts:

Open the project in your browser

Explore each mini app in the grid

Click into any app to view data fetched from its corresponding API

Refresh to see updated results depending on the API

Screenshots
Main Grid Layout
<img width="1460" height="908" alt="Screenshot 2026-02-25 at 12 06 20 AM" src="https://github.com/user-attachments/assets/ccc229ca-fd1c-4689-b353-7de9315f28e3" />


Sample Mini App View
<<img width="766" height="700" alt="Screenshot 2026-02-25 at 12 07 37 AM" src="https://github.com/user-attachments/assets/bd9e9134-0e48-4c04-b2f9-65c8a8ea4aac" />

Collaborators
Mary Fobbs‑Guillory — Developer

Coding Temple Bootcamp — Instruction & guidance

Credits
Coding Temple Bootcamp

Microsoft Copilot (debugging & code organization assistance)
