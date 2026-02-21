/* ==========================================
   VIRTUAL COLLEGE NOTICE BOARD SYSTEM
   Main JavaScript File
   ========================================== */

// ========== SAMPLE DATA - DUMMY NOTICES ==========
const sampleNotices = [
    {
        id: 1,
        title: "Mid-Semester Examination Schedule - Fall 2024",
        description: "The mid-semester examinations for all undergraduate programs will be conducted from March 15-22, 2024. Students are advised to check the detailed timetable on the examination portal. Hall tickets will be available for download from March 10, 2024.",
        section: "examination",
        importance: "important",
        datePosted: "2024-02-01",
        expiryDate: "2024-03-22",
        attachments: [],
        postedBy: "exam_admin"
    },
    {
        id: 2,
        title: "Hall Ticket Download Instructions",
        description: "Students can download their examination hall tickets from the student portal starting February 5, 2024. Please ensure all fee payments are cleared before downloading.",
        section: "examination",
        importance: "normal",
        datePosted: "2024-01-28",
        expiryDate: "2024-03-15",
        attachments: [{ name: "instructions.pdf", type: "pdf" }],
        postedBy: "exam_admin"
    },
    {
        id: 3,
        title: "Merit Scholarship Application Open for 2024",
        description: "Applications are now open for merit-based scholarships for the academic year 2024. Eligible students with a CGPA above 8.0 can apply. Please download the application form and submit before the deadline.",
        section: "scholarship",
        importance: "normal",
        datePosted: "2024-01-30",
        expiryDate: "2024-02-28",
        attachments: [{ name: "scholarship_form.pdf", type: "pdf" }],
        postedBy: "scholar_admin"
    },
    {
        id: 4,
        title: "Annual Tech Fest 2024 - Registration Open",
        description: "The annual tech fest 'TechnoVista 2024' will be held on March 5-7, 2024. Students can register for various competitions including coding, robotics, and project exhibitions. Register now to secure your spot!",
        section: "events",
        importance: "normal",
        datePosted: "2024-01-28",
        expiryDate: "2024-03-07",
        attachments: [{ name: "techfest_poster.jpg", type: "image" }],
        postedBy: "event_admin"
    },
    {
        id: 5,
        title: "Course Registration for Spring Semester 2024",
        description: "Course registration for Spring Semester 2024 will begin on February 10, 2024. Students must complete their registration within the stipulated time. Please consult your academic advisor before registration.",
        section: "academics",
        importance: "important",
        datePosted: "2024-01-25",
        expiryDate: "2024-02-20",
        attachments: [],
        postedBy: "acad_admin"
    },
    {
        id: 6,
        title: "Campus Recruitment Drive - Tech Giants 2024",
        description: "Leading tech companies will be visiting campus for recruitment in February. Final year students are requested to update their resumes and register through the placement portal. Pre-placement talks will be scheduled soon.",
        section: "placement",
        importance: "normal",
        datePosted: "2024-01-22",
        expiryDate: "2024-03-01",
        attachments: [{ name: "company_profiles.pdf", type: "pdf" }],
        postedBy: "place_admin"
    },
    {
        id: 7,
        title: "Library Extended Hours During Exams",
        description: "The college library will operate with extended hours during the examination period. From March 10-25, the library will be open from 7 AM to 11 PM including weekends.",
        section: "academics",
        importance: "normal",
        datePosted: "2024-01-20",
        expiryDate: "2024-03-25",
        attachments: [],
        postedBy: "acad_admin"
    },
    {
        id: 8,
        title: "Sports Day 2024 - Participation Registration",
        description: "Annual Sports Day will be organized on February 15, 2024. Students interested in participating in various sports events should register with the sports department by February 5, 2024.",
        section: "events",
        importance: "normal",
        datePosted: "2024-01-18",
        expiryDate: "2024-02-15",
        attachments: [],
        postedBy: "event_admin"
    },
    {
        id: 9,
        title: "Answer Script Review Process",
        description: "Students who wish to apply for answer script review should submit their applications within 7 days of result publication along with the prescribed fee.",
        section: "examination",
        importance: "normal",
        datePosted: "2024-01-20",
        expiryDate: "2024-01-31",
        attachments: [],
        postedBy: "exam_admin"
    },
    {
        id: 10,
        title: "Workshop on AI and Machine Learning",
        description: "A two-day workshop on Artificial Intelligence and Machine Learning will be conducted on February 20-21, 2024. Industry experts will be conducting hands-on sessions. Limited seats available.",
        section: "academics",
        importance: "important",
        datePosted: "2024-01-15",
        expiryDate: "2024-02-21",
        attachments: [{ name: "workshop_details.pdf", type: "pdf" }],
        postedBy: "acad_admin"
    }
];

// Store notices in localStorage for persistence
if (!localStorage.getItem('notices')) {
    localStorage.setItem('notices', JSON.stringify(sampleNotices));
}

// ========== HELPER FUNCTIONS ==========

// Get all notices from localStorage
function getAllNotices() {
    const notices = localStorage.getItem('notices');
    return notices ? JSON.parse(notices) : [];
}

// Save notices to localStorage
function saveNotices(notices) {
    localStorage.setItem('notices', JSON.stringify(notices));
}

// Check if notice is expired
function isExpired(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return today > expiry;
}

// Get active notices
function getActiveNotices() {
    return getAllNotices().filter(notice => !isExpired(notice.expiryDate));
}

// Get expired notices
function getExpiredNotices() {
    return getAllNotices().filter(notice => isExpired(notice.expiryDate));
}

// Get important notices
function getImportantNotices() {
    return getActiveNotices().filter(notice => notice.importance === 'important');
}

// Format date to readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get current user from session
function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Logout function
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Get section badge color
function getSectionBadgeColor(section) {
    const colors = {
        'examination': 'blue',
        'scholarship': 'green',
        'academics': 'purple',
        'events': 'orange',
        'placement': 'red'
    };
    return colors[section] || 'gray';
}

// ========== ADMIN LOGIN HANDLING ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Admin Login Form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const role = document.getElementById('adminRole').value;
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            
            // Simple validation (for demo purposes)
            if (role === 'super-admin' && username === 'superadmin' && password === 'super123') {
                // Super Admin Login
                const user = {
                    type: 'super-admin',
                    username: username,
                    role: 'Super Admin'
                };
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'admin-dashboard.html';
            } else if (username === 'admin' && password === 'admin123') {
                // Section Admin Login
                const user = {
                    type: 'section-admin',
                    username: username,
                    role: role
                };
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'section-admin.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }
    
    // Student Login Form
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentId = document.getElementById('studentId').value;
            const password = document.getElementById('studentPassword').value;
            
            // Simple validation (for demo purposes)
            if (studentId.startsWith('STU') && password === 'student123') {
                const user = {
                    type: 'student',
                    studentId: studentId,
                    name: 'Student Name'
                };
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'student-dashboard.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }
});

// ========== AUTHENTICATION CHECK ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if user should be logged in for this page
    const protectedPages = ['student-dashboard.html', 'admin-dashboard.html', 'section-admin.html', 'add-notice.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        if (!isLoggedIn()) {
            window.location.href = 'index.html';
            return;
        }
        
        const user = getCurrentUser();
        
        // Update user info in the page
        if (document.getElementById('adminName')) {
            document.getElementById('adminName').textContent = user.username || user.name;
        }
        if (document.getElementById('adminUsername')) {
            document.getElementById('adminUsername').textContent = user.username || user.studentId;
        }
        if (document.getElementById('sectionName')) {
            const sectionNames = {
                'examination': 'Examination Admin',
                'scholarship': 'Scholarship Admin',
                'academics': 'Academics Admin',
                'events': 'Events Admin',
                'placement': 'Placement Admin'
            };
            document.getElementById('sectionName').textContent = sectionNames[user.role] || user.role;
        }
        
        // Set section dropdown to user's section and disable it for section admins
        if (currentPage === 'add-notice.html' && user.type === 'section-admin') {
            const sectionSelect = document.getElementById('noticeSection');
            if (sectionSelect) {
                sectionSelect.value = user.role;
                sectionSelect.disabled = true;
            }
        }
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// ========== DISPLAY NOTICES ==========
function displayNotices(notices, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (notices.length === 0) {
        container.innerHTML = '<div class="no-notices"><i class="fas fa-inbox"></i><p>No notices found</p></div>';
        return;
    }
    
    const user = getCurrentUser();
    const isAdmin = user && (user.type === 'section-admin' || user.type === 'super-admin');
    const isStudent = user && user.type === 'student';
    
    container.innerHTML = notices.map(notice => {
        const expired = isExpired(notice.expiryDate);
        const badgeColor = getSectionBadgeColor(notice.section);
        
        // Check if current user can edit/delete this notice
        const canEdit = user && user.type === 'section-admin' && notice.section === user.role;
        
        return `
            <div class="notice-card ${isAdmin ? 'admin-notice' : ''}">
                <div class="notice-header">
                    <div class="notice-meta">
                        <span class="badge badge-${badgeColor}">${notice.section}</span>
                        ${notice.importance === 'important' ? '<span class="badge badge-important">Important</span>' : ''}
                    </div>
                    ${canEdit ? `
                    <div class="notice-actions">
                        <button class="btn-icon" onclick="editNotice(${notice.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="deleteNotice(${notice.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    ` : ''}
                    ${isStudent ? `
                    <div class="notice-actions">
                        <button class="btn-icon btn-view" onclick="viewNoticeDetails(${notice.id})" title="View Full Details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    ` : ''}
                </div>
                <h3 class="notice-title">${notice.title}</h3>
                <p class="notice-description">${notice.description}</p>
                ${notice.attachments && notice.attachments.length > 0 ? `
                    <div class="notice-attachments">
                        ${notice.attachments.map(att => `
                            <div class="attachment">
                                <i class="fas fa-file-${att.type === 'pdf' ? 'pdf' : 'image'}"></i>
                                <span>${att.name}</span>
                                <button class="btn-icon" onclick="downloadFile('${att.name}')" title="Download">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                <div class="notice-footer">
                    <div class="notice-info">
                        <span><i class="fas fa-calendar"></i> Posted: ${formatDate(notice.datePosted)}</span>
                        <span><i class="fas fa-clock"></i> Expires: ${formatDate(notice.expiryDate)}</span>
                    </div>
                    <div class="notice-status">
                        <span class="status-${expired ? 'expired' : 'active'}">${expired ? 'Expired' : 'Active'}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ========== LOAD NOTICES ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    const user = getCurrentUser();
    
    // Student Dashboard
    if (document.getElementById('noticesList') && user && user.type === 'student') {
        displayNotices(getActiveNotices(), 'noticesList');
        displayNotices(getImportantNotices(), 'importantNoticesList');
        displayNotices(getExpiredNotices(), 'archivedNoticesList');
    }
    
    // Section Admin Dashboard
    if (document.getElementById('myNoticesList') && user && user.type === 'section-admin') {
        const myNotices = getAllNotices().filter(n => n.section === user.role);
        const myActive = myNotices.filter(n => !isExpired(n.expiryDate));
        const myExpired = myNotices.filter(n => isExpired(n.expiryDate));
        const myImportant = myActive.filter(n => n.importance === 'important');
        
        displayNotices(myActive, 'myNoticesList');
        displayNotices(myImportant, 'importantNoticesList');
        displayNotices(myExpired, 'archivedNoticesList');
        
        // Update stats
        document.getElementById('myTotalNotices').textContent = myNotices.length;
        document.getElementById('myActiveNotices').textContent = myActive.length;
        document.getElementById('myImportantNotices').textContent = myImportant.length;
        document.getElementById('myArchivedNotices').textContent = myExpired.length;
    }
    
    // Super Admin Dashboard
    if (document.getElementById('allNoticesList') && user && user.type === 'super-admin') {
        displayNotices(getActiveNotices(), 'allNoticesList');
    }
});

// ========== NOTICE FORM - SET DEFAULT DATES ==========
document.addEventListener('DOMContentLoaded', function() {
    const noticeDateInput = document.getElementById('noticeDate');
    const expiryDateInput = document.getElementById('expiryDate');
    
    if (noticeDateInput && expiryDateInput) {
        // Set today's date as default for post date
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        noticeDateInput.value = todayStr;
        
        // Set 2 days from today as default for expiry date
        const twoDaysLater = new Date(today);
        twoDaysLater.setDate(today.getDate() + 2);
        const twoDaysLaterStr = twoDaysLater.toISOString().split('T')[0];
        expiryDateInput.value = twoDaysLaterStr;
    }
});

// ========== NOTICE FORM HANDLING WITH EDIT SUPPORT ==========
document.addEventListener('DOMContentLoaded', function() {
    
    const noticeForm = document.getElementById('noticeForm');
    if (noticeForm) {
        // Check if we're editing
        const editNoticeId = sessionStorage.getItem('editNoticeId');
        
        if (editNoticeId) {
            // Load notice for editing
            const notices = getAllNotices();
            const notice = notices.find(n => n.id === parseInt(editNoticeId));
            
            if (notice) {
                document.getElementById('formTitle').textContent = 'Edit Notice';
                document.getElementById('submitBtnText').textContent = 'Update Notice';
                
                document.getElementById('noticeTitle').value = notice.title;
                document.getElementById('noticeDescription').value = notice.description;
                document.getElementById('noticeSection').value = notice.section;
                document.getElementById('noticeImportance').value = notice.importance;
                document.getElementById('noticeDate').value = notice.datePosted;
                document.getElementById('expiryDate').value = notice.expiryDate;
                
                // Show existing attachment if any
                if (notice.attachments && notice.attachments.length > 0) {
                    const filePreview = document.getElementById('filePreview');
                    if (filePreview) {
                        filePreview.innerHTML = `
                            <div class="existing-attachment">
                                <p><strong>Current attachment:</strong></p>
                                <div class="attachment">
                                    <i class="fas fa-file-${notice.attachments[0].type === 'pdf' ? 'pdf' : 'image'}"></i>
                                    <span>${notice.attachments[0].name}</span>
                                </div>
                                <p><small>Upload a new file to replace it (optional)</small></p>
                            </div>
                        `;
                    }
                }
            }
        }
        
        noticeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const user = getCurrentUser();
            if (!user || user.type !== 'section-admin') {
                alert('Unauthorized');
                return;
            }
            
            const noticeData = {
                title: document.getElementById('noticeTitle').value,
                description: document.getElementById('noticeDescription').value,
                section: document.getElementById('noticeSection').value,
                importance: document.getElementById('noticeImportance').value,
                datePosted: document.getElementById('noticeDate').value,
                expiryDate: document.getElementById('expiryDate').value,
                postedBy: user.username
            };
            
            // Verify user can only post to their section
            if (noticeData.section !== user.role) {
                alert('You can only post notices to your assigned section: ' + user.role);
                return;
            }
            
            // Handle file attachment
            const fileInput = document.getElementById('noticeAttachment');
            const attachments = [];
            
            if (fileInput && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const fileName = file.name;
                const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
                
                attachments.push({
                    name: fileName,
                    type: fileType
                });
            }
            
            const notices = getAllNotices();
            
            if (editNoticeId) {
                // Update existing notice
                const index = notices.findIndex(n => n.id === parseInt(editNoticeId));
                if (index !== -1) {
                    // Keep old attachments if no new file uploaded
                    if (attachments.length > 0) {
                        noticeData.attachments = attachments;
                    } else {
                        noticeData.attachments = notices[index].attachments || [];
                    }
                    
                    notices[index] = { ...notices[index], ...noticeData };
                    saveNotices(notices);
                    sessionStorage.removeItem('editNoticeId');
                    alert('Notice updated successfully!');
                }
            } else {
                // Create new notice
                noticeData.id = Date.now();
                noticeData.attachments = attachments;
                notices.push(noticeData);
                saveNotices(notices);
                alert('Notice published successfully!');
            }
            
            window.location.href = 'section-admin.html';
        });
    }
});

// ========== SEARCH AND FILTER ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Search functionality
    const searchInputs = ['searchNotices', 'searchNotice', 'searchMyNotice'];
    
    searchInputs.forEach(inputId => {
        const searchInput = document.getElementById(inputId);
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                filterNotices();
            });
        }
    });
    
    // Section filter checkboxes
    const sectionFilters = document.querySelectorAll('.section-filter');
    sectionFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            filterNotices();
        });
    });
    
    // Filter selects
    const filterSelects = ['filterSection', 'filterStatus'];
    filterSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', function() {
                filterNotices();
            });
        }
    });
});

function filterNotices() {
    const user = getCurrentUser();
    let notices = getActiveNotices();
    
    // Get search query
    const searchInput = document.getElementById('searchNotices') || 
                       document.getElementById('searchNotice') ||
                       document.getElementById('searchMyNotice');
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
    
    // Get selected sections (for student dashboard)
    const sectionFilters = document.querySelectorAll('.section-filter:checked');
    const selectedSections = Array.from(sectionFilters).map(f => f.value);
    
    // Filter by section checkboxes
    if (selectedSections.length > 0 && selectedSections.length < 5) {
        notices = notices.filter(n => selectedSections.includes(n.section));
    }
    
    // Filter by section dropdown (for admin dashboard)
    const sectionSelect = document.getElementById('filterSection');
    if (sectionSelect && sectionSelect.value) {
        notices = notices.filter(n => n.section === sectionSelect.value);
    }
    
    // Filter by status (for section admin)
    const statusSelect = document.getElementById('filterStatus');
    if (statusSelect && statusSelect.value) {
        if (statusSelect.value === 'active') {
            notices = notices.filter(n => !isExpired(n.expiryDate));
        } else if (statusSelect.value === 'expired') {
            notices = getExpiredNotices();
        }
    }
    
    // Search filter
    if (searchQuery) {
        notices = notices.filter(n => 
            n.title.toLowerCase().includes(searchQuery) ||
            n.description.toLowerCase().includes(searchQuery) ||
            n.section.toLowerCase().includes(searchQuery)
        );
    }
    
    // Display filtered notices
    const containerId = document.getElementById('noticesList') ? 'noticesList' :
                       document.getElementById('myNoticesList') ? 'myNoticesList' :
                       'allNoticesList';
    
    displayNotices(notices, containerId);
}

// ========== NOTICE ACTIONS ==========
function editNotice(id) {
    sessionStorage.setItem('editNoticeId', id);
    window.location.href = 'add-notice.html';
}

function deleteNotice(id) {
    if (confirm('Are you sure you want to delete this notice?')) {
        const notices = getAllNotices().filter(n => n.id !== id);
        saveNotices(notices);
        alert('Notice deleted successfully!');
        location.reload();
    }
}

// ========== VIEW NOTICE DETAILS (EYE ICON) ==========
function viewNoticeDetails(id) {
    const notices = getAllNotices();
    const notice = notices.find(n => n.id === id);
    
    if (!notice) return;
    
    const badgeColor = getSectionBadgeColor(notice.section);
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('noticeDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'noticeDetailModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="closeNoticeModal()">&times;</span>
            <div class="modal-header">
                <h2>${notice.title}</h2>
                <div class="modal-badges">
                    <span class="badge badge-${badgeColor}">${notice.section}</span>
                    ${notice.importance === 'important' ? '<span class="badge badge-important">Important</span>' : ''}
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-info">
                    <p><i class="fas fa-calendar"></i> <strong>Posted:</strong> ${formatDate(notice.datePosted)}</p>
                    <p><i class="fas fa-clock"></i> <strong>Expires:</strong> ${formatDate(notice.expiryDate)}</p>
                    <p><i class="fas fa-user"></i> <strong>Posted by:</strong> ${notice.postedBy}</p>
                </div>
                <div class="modal-description">
                    <h3>📄 Full Description</h3>
                    <p>${notice.description}</p>
                </div>
                ${notice.attachments && notice.attachments.length > 0 ? `
                    <div class="modal-attachments">
                        <h3>📎 Attachments</h3>
                        ${notice.attachments.map(att => `
                            <div class="attachment-item">
                                <i class="fas fa-file-${att.type === 'pdf' ? 'pdf' : 'image'}"></i>
                                <span>${att.name}</span>
                                <button class="btn-small" onclick="downloadFile('${att.name}')">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="no-attachments"><i class="fas fa-info-circle"></i> No attachments</p>'}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeNoticeModal() {
    const modal = document.getElementById('noticeDetailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('noticeDetailModal');
    if (event.target === modal) {
        closeNoticeModal();
    }
}

// ========== FILE HANDLING ==========
function handleFileSelect(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('filePreview');
    
    if (file) {
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        
        // Check file size (5MB limit)
        if (fileSize > 5) {
            alert('❌ File size exceeds 5MB limit\n\nPlease choose a smaller file.');
            event.target.value = '';
            if (preview) preview.innerHTML = '';
            return;
        }
        
        // Check file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('❌ Invalid file type\n\nOnly PDF, JPG, and PNG files are allowed.');
            event.target.value = '';
            if (preview) preview.innerHTML = '';
            return;
        }
        
        // Determine file type for icon
        let fileIcon = 'file';
        if (file.type === 'application/pdf') {
            fileIcon = 'file-pdf';
        } else if (file.type.startsWith('image/')) {
            fileIcon = 'file-image';
        }
        
        // Show preview
        if (preview) {
            preview.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-${fileIcon}"></i>
                    <div class="file-details">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${fileSize} MB</span>
                    </div>
                    <button type="button" onclick="clearFile()" class="btn-icon" title="Remove file">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }
    }
}

function clearFile() {
    const fileInput = document.getElementById('noticeAttachment');
    const preview = document.getElementById('filePreview');
    if (fileInput) fileInput.value = '';
    if (preview) preview.innerHTML = '';
}

function resetForm() {
    const form = document.getElementById('noticeForm');
    if (form) form.reset();
    clearFile();
    
    // Reset default dates
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    document.getElementById('noticeDate').value = todayStr;
    
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    const twoDaysLaterStr = twoDaysLater.toISOString().split('T')[0];
    document.getElementById('expiryDate').value = twoDaysLaterStr;
}

function saveDraft() {
    alert('Draft saved! (This feature will save the form data locally)');
}

function downloadFile(filename) {
    // Create a dummy file content for demo purposes
    const fileExtension = filename.split('.').pop().toLowerCase();
    
    let blob;
    
    if (fileExtension === 'pdf') {
        // Create a simple PDF
        const pdfContent = `%PDF-1.4
1 0 obj

/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj

/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj

/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources 
/Font 
/F1 
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
>>
endobj
4 0 obj

/Length 100
>>
stream
BT
/F1 24 Tf
100 700 Td
(Notice Board System) Tj
0 -30 Td
/F1 12 Tf
(Filename: ${filename}) Tj
0 -20 Td
(This is a demo PDF file) Tj
0 -20 Td
(Created by Virtual Notice Board) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000317 00000 n
trailer

/Size 5
/Root 1 0 R
>>
startxref
469
%%EOF`;
        
        blob = new Blob([pdfContent], { type: 'application/pdf' });
    } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        // Create a simple 1x1 pixel image (base64 encoded)
        const imgData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        const byteCharacters = atob(imgData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], { type: 'image/png' });
    } else {
        alert('File type not supported for download in demo mode');
        return;
    }
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    setTimeout(() => {
        alert(`✅ File Downloaded: ${filename}\n\nℹ️ Note: This is a demo file. In production with backend, you would download the actual uploaded file.`);
    }, 100);
}

// ========== SUPER ADMIN - VIEW ALL BY SECTION ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Only run on admin dashboard
    if (window.location.pathname.includes('admin-dashboard.html')) {
        
        // Get all "View All" buttons in section cards
        const viewAllButtons = document.querySelectorAll('.section-card .btn-small');
        
        viewAllButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the section from the parent card
                const card = this.closest('.section-card');
                const sectionTitle = card.querySelector('h4').textContent.trim().toLowerCase();
                
                // Map section titles to section values
                const sectionMap = {
                    'examination': 'examination',
                    'scholarship': 'scholarship',
                    'academics': 'academics',
                    'events': 'events',
                    'placement': 'placement'
                };
                
                const section = sectionMap[sectionTitle];
                
                if (section) {
                    // Show the "All Notices" section
                    showAllNoticesSection();
                    
                    // Filter notices by this section
                    const sectionNotices = getAllNotices().filter(n => n.section === section);
                    const activeNotices = sectionNotices.filter(n => !isExpired(n.expiryDate));
                    
                    // Display notices
                    displayNotices(activeNotices, 'allNoticesList');
                    
                    // Update filter dropdown to show current section
                    const filterSection = document.getElementById('filterSection');
                    if (filterSection) {
                        filterSection.value = section;
                    }
                    
                    // Scroll to notices section
                    document.getElementById('all-notices').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});

// Function to show "All Notices" section in super admin dashboard
function showAllNoticesSection() {
    // Remove active class from all sidebar links and sections
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.content-section');
    
    sidebarLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    // Activate "All Notices" section
    const allNoticesLink = document.querySelector('.sidebar-link[data-section="all-notices"]');
    const allNoticesSection = document.getElementById('all-notices');
    
    if (allNoticesLink) allNoticesLink.classList.add('active');
    if (allNoticesSection) allNoticesSection.classList.add('active');
}

// ========== SIDEBAR NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
    
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
    const sections = document.querySelectorAll('.content-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all links and sections
            sidebarLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link and target section
            this.classList.add('active');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
            }
        });
    });
});

console.log('Virtual College Notice Board System - JavaScript Loaded Successfully');