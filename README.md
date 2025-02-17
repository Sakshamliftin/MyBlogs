# MyBlogs

## Overview  
**MyBlogs** is a simple blog application that enables users to create, read, update, and delete (CRUD) blogs. While currently functioning without a database, the app features a clean and responsive design using HTML, CSS, and JavaScript, along with templating powered by **EJS**.  

Built using **Node.js** and **Express.js**, BlogApp includes:  
- **Home Page**: Displays existing blogs with a user-friendly layout.  
- **Blog Management**: Users can add, edit, and delete blogs.  
- **Contact Us Page**: A form for users to get in touch.  
- **About Page**: Includes testimonials about the app.  

In the future, BlogApp will integrate advanced features like:  
- Suggested blogs generated by an **LLM (Large Language Model)**.  
- Persistent data storage using **PostgreSQL**.  

---

## Features  
- **Create, Read, Update, Delete (CRUD)**: Manage blogs seamlessly.  
- **Templating with EJS**: Dynamically render pages for a smooth user experience.  
- **Responsive Design**: Styled with custom CSS for a polished look.  
- **Static Pages**:  
  - About Page: Highlights app details and includes testimonials.  
  - Contact Page: Allows users to reach out.  

---

## Technology Stack  
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js , Postgres
- **Templating Engine**: EJS  

---

## How to Run the App  

### Prerequisites  
- [Node.js](https://nodejs.org/) (v14+ recommended)  
- [Git](https://git-scm.com/)  

### Steps  
1. Clone the repository:  
   ```bash
   git clone https://github.com/Sakshamliftin/MyBlogs.git
   ```  
2. Navigate to the project directory:  
   ```bash
   cd MyBlogs
   ```  
3. Install dependencies:  
   ```bash
   npm install
   ```  
4. Start the application:  
   ```bash
   npm start
   ```  
5. Open your browser and navigate to:  
   ```
   http://localhost:3000
   ```  

---

## Future Enhancements  
- **Integration with PostgreSQL**: Store blogs and user data persistently.  
- **Suggested Blogs**: Leverage AI with an **LLM** to recommend related content.  
- **Enhanced Contact Form**: Add email functionality for user messages.  
- **Authentication**: Allow users to sign up and log in securely.  

---

## Folder Structure  
```
MyBlogs/
├── public/          # Static files (CSS, Images)
├── views/           # EJS templates
├── server.js        # Main application file
└── package.json     # Project dependencies
```

---

## Contribution  
Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

---

## License  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Let me know if you'd like further tweaks or additional sections!
