import express from "express";
import pg from "pg";
const { Pool } = pg;

const app = express();
const port = 3000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog_db',
  password: 's@123',
  port: 5432,
});

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

// Initialize database table
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        author VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        title VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        body TEXT NOT NULL
      )
    `);

    // Check if there are any blogs, if not insert the default blog
    const result = await pool.query('SELECT COUNT(*) FROM blogs');
    if (result.rows[0].count === '0') {
      const { formattedDate, formattedTime } = getCurrentDateTime();
      await pool.query(
        `INSERT INTO blogs (author, date, time, title, subject, body) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          'Saksham',
          formattedDate,
          formattedTime,
          'Create your own blogs🤩',
          'Detailed guide on how to get started!',
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam est distinctio reprehenderit nam dicta, veniam soluta dolorum labore. Expedita veritatis voluptate dolorum eveniet perferendis.'
        ]
      );
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Route to display homepage with blogs
app.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
    const blogs = {};
    result.rows.forEach((blog, index) => {
      blogs[`blog${index + 1}`] = {
        author: blog.author,
        date: blog.date,
        time: blog.time,
        title: blog.title,
        subject: blog.subject,
        body: blog.body,
        id: blog.id  // Store the database ID for reference
      };
    });
    res.render("index.ejs", { blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send("Error fetching blogs");
  }
});

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
app.post("/submit", async (req, res) => {
  try {
    const { author_new, title_new, subject_new, body_new } = req.body;
    const { formattedDate, formattedTime } = getCurrentDateTime();

    if (!author_new || !title_new || !subject_new || !body_new) {
      return res.send("All fields are required.");
    }

    await pool.query(
      `INSERT INTO blogs (author, date, time, title, subject, body) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [author_new, formattedDate, formattedTime, title_new, subject_new, body_new]
    );

    res.redirect("/");
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send("Error creating blog");
  }
});

app.post('/delete', async (req, res) => {
  try {

    const { blogKey } = req.body;
    // First get the blog's ID from the database
    const result = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
    const blogs = {};
    result.rows.forEach((blog, index) => {
      blogs[`blog${index + 1}`] = {
        ...blog,
        id: blog.id
      };
    });
    const blogId = blogs[blogKey].id;  // Get the database ID
    await pool.query('DELETE FROM blogs WHERE id = $1', [blogId]);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send("Error deleting blog");
  }
});

app.get('/edit/:blogKey', async (req, res) => {
  try {
    const blogKey = req.params.blogKey;
    const blogId = blogs[blogKey].id;  // Get the database ID
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [blogId]);
    const blog = result.rows[0];

    if (!blog) {
      return res.redirect('/');
    }

    res.render('edit.ejs', { blog, blogKey });
  } catch (error) {
    console.error('Error fetching blog for edit:', error);
    res.status(500).send("Error fetching blog");
  }
});

app.post('/edit/:blogKey', async (req, res) => {
  try {
    const blogKey = req.params.blogKey;
    const blogId = blogs[blogKey].id;  // Get the database ID
    const { author_new, title_new, subject_new, body_new } = req.body;

    await pool.query(
      `UPDATE blogs 
       SET author = $1, title = $2, subject = $3, body = $4 
       WHERE id = $5`,
      [author_new, title_new, subject_new, body_new, blogId]
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).send("Error updating blog");
  }
});

app.post("/submit-contact", (req, res) => {
  res.redirect('/');
});

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});