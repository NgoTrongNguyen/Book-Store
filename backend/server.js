const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ========== IN-MEMORY DATABASE ==========
// Trong production, sử dụng database thực (MongoDB, PostgreSQL, etc.)

let preorders = [];
let reviews = [
    {
        id: 1,
        author: 'Alex Thompson',
        title: 'A Game-Changer for Designers',
        text: 'This book completely transformed how I approach design problems. Chen\'s methodology is crystal clear and immediately applicable. The case studies are exceptional.',
        rating: 5,
        date: '2025-01-15'
    },
    {
        id: 2,
        author: 'Maria Garcia',
        title: 'Comprehensive and Insightful',
        text: 'Finally, a design book that bridges theory and practice. The chapters on accessibility and design systems are particularly valuable. Highly recommended for all skill levels.',
        rating: 5,
        date: '2025-01-10'
    },
    {
        id: 3,
        author: 'David Kim',
        title: 'Essential Reading',
        text: 'Whether you\'re a junior designer or a seasoned professional, this book offers something valuable. Chen\'s writing is clear and engaging, making complex concepts accessible.',
        rating: 4,
        date: '2025-01-05'
    },
    {
        id: 4,
        author: 'Sophie Laurent',
        title: 'Brilliant Insights on Modern Design',
        text: 'The intersection of aesthetics and functionality is explored beautifully. This is the design book I\'ve been waiting for.',
        rating: 5,
        date: '2024-12-28'
    },
    {
        id: 5,
        author: 'Marcus Johnson',
        title: 'Perfect for Design Teams',
        text: 'Our entire team read this and it sparked amazing conversations. We\'ve already implemented several methodologies from the book.',
        rating: 5,
        date: '2024-12-20'
    }
];

const authorData = {
    name: 'Sarah Chen',
    title: 'Design Director & Design System Architect',
    bio: 'Sarah Chen is an internationally recognized design leader with over 15 years of experience creating digital products for Fortune 500 companies and innovative startups. Her work has shaped design practices at major tech companies and influenced the next generation of designers worldwide.',
    achievements: [
        'Led design teams at three major tech companies',
        'Speaker at 20+ international design conferences',
        'Published numerous articles on design theory and practice',
        'Mentored 100+ designers throughout her career',
        'Built design systems serving millions of users',
        'Design Excellence Award (2022)',
        'Featured in Design Magazine\'s 50 Most Influential Designers'
    ]
};

// ========== API ROUTES ==========

/**
 * Health Check
 */
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

/**
 * POST /api/preorder - Submit a new preorder
 */
app.post('/api/preorder', (req, res) => {
    try {
        const { name, email, phone, quantity, address, city, zip, country, requests, updates } = req.body;

        // Validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and phone are required'
            });
        }

        // Validation email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Create preorder object
        const preorder = {
            id: preorders.length + 1,
            name,
            email,
            phone,
            quantity: quantity || '1',
            address,
            city,
            zip,
            country,
            requests: requests || '',
            updates,
            status: 'pending',
            createdAt: new Date().toISOString(),
            totalPrice: parseFloat(quantity || 1) * 45
        };

        // Save to "database"
        preorders.push(preorder);

        // In production: send email confirmation, save to database, etc.
        console.log('New preorder:', preorder);

        res.status(201).json({
            success: true,
            message: 'Preorder submitted successfully',
            data: {
                orderId: preorder.id,
                email: preorder.email,
                totalPrice: preorder.totalPrice,
                estimatedDelivery: 'April 2025'
            }
        });

    } catch (error) {
        console.error('Error processing preorder:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * GET /api/preorders - Get all preorders (admin only)
 */
app.get('/api/preorders', (req, res) => {
    // In production: check authentication
    res.json({
        total: preorders.length,
        preorders: preorders
    });
});

/**
 * GET /api/reviews - Get all reviews
 */
app.get('/api/reviews', (req, res) => {
    try {
        // Sort by date descending
        const sortedReviews = [...reviews].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        res.json(sortedReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * POST /api/reviews - Submit a new review
 */
app.post('/api/reviews', (req, res) => {
    try {
        const { author, title, text, rating } = req.body;

        // Validation
        if (!author || !title || !text || !rating) {
            return res.status(400).json({
                success: false,
                message: 'Author, title, text, and rating are required'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Create review object
        const review = {
            id: reviews.length + 1,
            author,
            title,
            text,
            rating,
            date: new Date().toISOString()
        };

        // Save to "database"
        reviews.push(review);

        console.log('New review:', review);

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: review
        });

    } catch (error) {
        console.error('Error processing review:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * GET /api/author - Get author information
 */
app.get('/api/author', (req, res) => {
    try {
        res.json(authorData);
    } catch (error) {
        console.error('Error fetching author info:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * GET /api/book - Get book information
 */
app.get('/api/book', (req, res) => {
    try {
        const bookInfo = {
            title: 'The Art of Digital Design',
            category: 'Design Theory',
            author: 'Sarah Chen',
            pages: 384,
            format: 'Hardcover',
            releaseDate: '2025-03-01',
            price: 45.00,
            description: 'A masterful examination of the principles that define contemporary design practice...',
            totalReviews: reviews.length,
            averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        };

        res.json(bookInfo);
    } catch (error) {
        console.error('Error fetching book info:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// ========== 404 HANDLER ==========
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.path
    });
});

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════╗
    ║  Premium Book Preorder API Server    ║
    ║  Server running on port ${PORT}       ║
    ║  Environment: ${process.env.NODE_ENV || 'development'}          ║
    ╚══════════════════════════════════════╝
    
    API Endpoints:
    ✓ POST   /api/preorder    - Submit preorder
    ✓ GET    /api/preorders   - Get all preorders
    ✓ GET    /api/reviews     - Get all reviews
    ✓ POST   /api/reviews     - Submit review
    ✓ GET    /api/author      - Get author info
    ✓ GET    /api/book        - Get book info
    `);
});