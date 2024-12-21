import express from "express";

const app = express();
const port = 3000;

// Helper function to get the current date and time
const getCurrentDateTime = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const formattedDate = `${year}-${month}-${day}`;

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { formattedDate, formattedTime };
};

// Blog data store
let blogs = {
  blog1: {
    author: "Saksham",
    date: getCurrentDateTime().formattedDate,
    time: getCurrentDateTime().formattedTime,
    title: "Create your own blogs🤩",
    subject: "Detailed guide on how to get started!",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam est distinctio reprehenderit nam dicta, veniam soluta dolorum labore. Expedita veritatis voluptate dolorum eveniet perferendis.",
  },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Express's built-in body parsing middleware

// Serve static files from the public folder
app.use(express.static("public"));

// Route to display homepage with blogs
app.get("/", (req, res) => {
  res.render("index.ejs", { blogs });
});

// Route to display the new blog form
app.get("/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// Route to handle new blog submission
app.post("/submit", (req, res) => {

  const { author_new, title_new, subject_new, body_new } = req.body;

  const { formattedDate, formattedTime } = getCurrentDateTime();

  if (!author_new || !title_new || !subject_new || !body_new) {
    return res.send("All fields are required.");
  }

  const newBlog = {
    author: author_new,
    date: formattedDate,
    time: formattedTime,
    title: title_new,
    subject: subject_new,
    body: body_new,
  };

  const newKey = `blog${Object.keys(blogs).length + 1}`;
  blogs[newKey] = newBlog;
  res.redirect("/");  // Redirect to the homepage to see the updated list of blogs
});

app.post('/delete', (req, res) => {
  const { blogKey } = req.body;
  if (blogs[blogKey]) {
    delete blogs[blogKey];
  }
  res.redirect('/');
});

// Route to show edit form
app.get('/edit/:blogKey', (req, res) => {
  const blogKey = req.params.blogKey;
  const blog = blogs[blogKey];

  if (!blog) {
    return res.redirect('/');
  }

  res.render('edit.ejs', { blog, blogKey });
});

// Route to handle edit submission
app.post('/edit/:blogKey', (req, res) => {
  const blogKey = req.params.blogKey;
  const { author_new, title_new, subject_new, body_new } = req.body;

  if (blogs[blogKey]) {
    blogs[blogKey] = {
      ...blogs[blogKey], // preserve original date/time
      author: author_new,
      title: title_new,
      subject: subject_new,
      body: body_new,
    };
  }

  res.redirect('/');
});

app.post("/submit-contact", (req, res) => {
  res.redirect('/');
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
