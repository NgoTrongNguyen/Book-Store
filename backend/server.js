const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require('./serviceAccountKey.json'); // Nhớ giữ lại dấu ./ ở đây để chạy được ở máy cá nhân

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ========== IN-MEMORY DATA (for initial setup) ==========
// Dữ liệu này sẽ được lưu vào Firestore một lần
const initialReviews = [
    {
        id: 1,
        author: 'Nguyễn Minh Tuấn',
        title: 'May mắn khi được đọc bản thảo thử nghiệm sớm!',
        text: 'Là một trong những người đầu tiên được tiếp cận bản thảo thử nghiệm, tôi thực sự bị sốc bởi tư duy Vibe Coding mà sách chia sẻ. Dù bản thảo lúc đó còn vài lỗi chính tả nhỏ, nhưng phương pháp luận điều khiển AI để sáng tạo sản phẩm thì quá xuất sắc và thực tế.',
        rating: 5,
        date: '2026-06-15'
    },
    {
        id: 2,
        author: 'Trần Thị Mai Chi',
        title: 'Bản beta quá chất lượng, mong chờ sách in chính thức',
        text: 'Tôi nhận được bản thảo dùng thử từ tác giả và đã thức cả đêm để đọc hết. Sách không chỉ dạy Vibe Coding đơn thuần mà còn định hình lại toàn bộ quy trình làm việc giữa người và AI. Mong là bản in chính thức sẽ giữ trọn vẹn được sự nhiệt huyết này.',
        rating: 5,
        date: '2026-06-10'
    },
    {
        id: 3,
        author: 'Hoàng Đăng Khoa',
        title: 'Đóng góp ý kiến cho bản thảo và học được vô số điều',
        text: 'Tham gia đội ngũ đọc thử và phản hồi (feedback) cho cuốn sách này là một trải nghiệm vô giá. Từ một người hoài nghi về Vibe Coding, những chương bản thảo đầu tiên đã thuyết phục tôi hoàn toàn về kỷ nguyên mới của các nhà sáng tạo.',
        rating: 4,
        date: '2026-06-02'
    },
    {
        id: 4,
        author: 'Lê Thu Thảo',
        title: 'Góc nhìn tiên phong ngay từ những trang viết đầu tiên',
        text: 'Cầm trên tay bản thảo sơ thảo mà tôi cứ ngỡ là một cuốn sách đã hoàn thiện vì kiến thức quá đặc quánh. Cách tác giả hướng dẫn người đọc "bắt vần" (vibe) với AI để code mở ra một chương hoàn toàn mới cho giới công nghệ hiện tại.',
        rating: 5,
        date: '2026-05-28'
    },
    {
        id: 5,
        author: 'Phạm Đức Anh',
        title: 'Cả team mình đã cùng mổ xẻ bản thảo thử nghiệm này',
        text: 'Tác giả đã gửi cho team mình bản thảo bản đọc sớm để kiểm chứng thực tế. Kết quả là tụi mình đã áp dụng ngay các tips Vibe Coding vào dự án hiện tại của công ty và thấy hiệu suất tăng rõ rệt. Sách cực kỳ đáng đồng tiền bát gạo khi ra mắt!',
        rating: 5,
        date: '2026-05-19'
    }
];

const authorData = {
    authors: [
        {
            id: 1,
            name: 'ThS. Hồ Viết Đức Lương',
            title: 'Tác giả chính',
            bio: 'hiện giảng dạy tại Trường Công nghệ Thông tin và Truyền thông, Đại học Bách khoa Hà Nội và nghiên cứu tại Trung tâm Nghiên cứu quốc tế về Trí tuệ nhân tạo BKAI. Thầy có nhiều công bố khoa học trên các tạp chí và hội nghị hàng đầu trên thế giới trong nhiều lĩnh vực Trí tuệ nhân tạo, Tối ưu hóa và Tin học sức khỏe. Thầy là tác giả của nhiều đầu sách cho học sinh THCS, điển hình là bộ "Định hướng, Trau dồi, Chinh phục Toán THCS"',
            imageUrl: 'https://i.ibb.co/wZPGmqhT/hovietducluong.jpg',
            achievements: [
                'Giảng dạy tại Bách khoa Hà Nội',
                'Nghiên cứu tại BKAI',
                'Công bố khoa học tại các tạp chí hàng đầu thế giới',
                'Chuyên gia về AI, Tối ưu hóa và Tin học sức khỏe',
                'Tác giả bộ sách "Chinh phục Toán THCS"'
            ]
        },
        {
            id: 2,
            name: 'Ngô Trọng Nguyên',
            title: 'Tác giả chính',
            bio: 'hiện đang là sinh viên ngành Kỹ thuật Máy tính tại Trường Công nghệ Thông tin và Truyền thông, Đại học Bách khoa Hà Nội. Anh là thành viên năng nổ trong Câu lạc bộ Sáng tạo Sinh viên SINNO và đã tham gia hướng dẫn tại các Trại hè Công nghệ KIDEMY - một hoạt động cộng đồng đầy hấp dẫn của Trường Công nghệ Thông tin và Truyền thông nhằm mục đích mang đến cho các bạn trẻ những cập nhật công nghệ mới nhất. Đây cũng là nơi anh và thầy Lương lấy cảm hứng để viết cuốn sách này.',
            imageUrl: 'https://i.ibb.co/6RV5sGK5/ngotrongnguyen.jpg',
            achievements: [
                'Sinh viên Kỹ thuật Máy tính, Bách khoa Hà Nội',
                'Thành viên Câu lạc bộ Sáng tạo Sinh viên SINNO',
                'Hướng dẫn viên Trại hè Công nghệ KIDEMY',
                'Chia sẻ kiến thức công nghệ với cộng đồng',
                'Cộng tác viên dự án sách giáo dục'
            ]
        }
    ]
};


// ========== HELPER: Initialize Firebase Collections ==========
async function initializeCollections() {
    try {
        // Check if reviews exist
        const reviewsSnapshot = await db.collection('reviews').limit(1).get();
        if (reviewsSnapshot.empty) {
            console.log('📝 Initializing reviews collection...');
            for (const review of initialReviews) {
                await db.collection('reviews').add(review);
            }
            console.log('✓ Reviews initialized');
        }

        // Check if author exists
        const authorSnapshot = await db.collection('author').doc('info').get();
        if (!authorSnapshot.exists) {
            console.log('👤 Initializing author document...');
            await db.collection('author').doc('info').set(authorData);
            console.log('✓ Author initialized');
        }

        // Check if book info exists
        const bookSnapshot = await db.collection('book').doc('info').get();
        if (!bookSnapshot.exists) {
            console.log('Initializing book document...');
            await db.collection('book').doc('info').set({
                title: 'Kỷ Nguyên của Những Nhà Sáng Tạo Vibe Code',
                category: 'Technology & Startup',
                author: 'ThS. Hồ Việt Độc Lương, Ngô Trọng Nguyên',
                pages: 119,
                format: 'Paperback',
                releaseDate: '2026-07-01',
                price: 45.00,
                description: 'Cuốn sách dành cho các nhà phát triển, startup founders, và những người đam mê công nghệ muốn hiểu rõ hơn về quy trình từ ý tưởng đến sản phẩm thực tế.Thông qua cách tiếp cận thực tế, học cách từ Ý Tưởng → Thực Thi Code → Tạo Sản Phẩm có Tác Động'
            });
            console.log('✓ Book info initialized');
        }
    } catch (error) {
        console.error('Error initializing collections:', error);
    }
}

// ========== API ROUTES ==========

/**
 * Health Check
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        database: 'Firebase Firestore',
        message: 'Server is running'
    });
});

/**
 * POST /api/preorder - Submit a new preorder
 */
app.post('/api/preorder', async (req, res) => {
    try {
        const { name, email, phone, quantity, address, city, country, requests, updates } = req.body;

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
            name,
            email,
            phone,
            quantity: quantity || '1',
            address,
            city,
            country,
            requests: requests || '',
            updates: updates || false,
            status: 'pending',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            totalPrice: parseFloat(quantity || 1) * 45
        };

        // Save to Firestore
        const docRef = await db.collection('preorders').add(preorder);

        console.log('✓ New preorder saved:', docRef.id);

        // In production: send email confirmation using SendGrid, Mailgun, etc.
        // Example:
        // await sendConfirmationEmail(email, preorder);

        res.status(201).json({
            success: true,
            message: 'Preorder submitted successfully',
            data: {
                orderId: docRef.id,
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
app.get('/api/preorders', async (req, res) => {
    try {
        // In production: check authentication/authorization
        // const token = req.headers.authorization?.split('Bearer ')[1];
        // if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

        const snapshot = await db.collection('preorders')
            .orderBy('createdAt', 'desc')
            .get();

        const preorders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));

        res.json({
            total: preorders.length,
            preorders: preorders
        });

    } catch (error) {
        console.error('Error fetching preorders:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * GET /api/reviews - Get all reviews
 */
app.get('/api/reviews', async (req, res) => {
    try {
        const snapshot = await db.collection('reviews')
            .orderBy('date', 'desc')
            .get();

        const reviews = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(reviews);

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
app.post('/api/reviews', async (req, res) => {
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
            author,
            title,
            text,
            rating,
            date: new Date().toISOString()
        };

        // Save to Firestore
        const docRef = await db.collection('reviews').add(review);

        console.log('✓ New review saved:', docRef.id);

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: {
                id: docRef.id,
                ...review
            }
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
app.get('/api/author', async (req, res) => {
    try {
        const doc = await db.collection('author').doc('info').get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Author information not found'
            });
        }

        res.json(doc.data());

    } catch (error) {
        console.error('Error fetching author:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * GET /api/book - Get book information
 */
app.get('/api/book', async (req, res) => {
    try {
        const bookDoc = await db.collection('book').doc('info').get();
        const reviewsSnapshot = await db.collection('reviews').get();

        if (!bookDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Book information not found'
            });
        }

        const bookInfo = bookDoc.data();
        const reviews = reviewsSnapshot.docs.map(doc => doc.data());
        const averageRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

        res.json({
            ...bookInfo,
            totalReviews: reviews.length,
            averageRating: parseFloat(averageRating)
        });

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
app.listen(PORT, async () => {
    // Initialize collections on startup
    await initializeCollections();

    console.log(`
    ╔══════════════════════════════════════╗
    ║  Premium Book Preorder API Server    ║
    ║  Server running on port ${PORT}       ║
    ║  Database: Firebase Firestore        ║
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

// ========== GRACEFUL SHUTDOWN ==========
process.on('SIGINT', async () => {
    console.log('\n📵 Shutting down gracefully...');
    await admin.app().delete();
    process.exit(0);
});