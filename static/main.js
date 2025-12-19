// Dating app with full functionality
let profiles = [];
let currentIndex = 0;
let myProfile = null;
let darkMode = localStorage.getItem('darkMode') === '1';

// DOM elements
const cardStack = document.querySelector('.card-stack');
const themeToggle = document.getElementById('theme-toggle');
const createBtn = document.getElementById('create-btn');
const createPanel = document.querySelector('.create-panel');
const createClose = document.querySelector('.create-close');
const createSave = document.getElementById('create-save');
const profileBtn = document.querySelector('.profile-btn');

// Apply theme on load
function applyTheme() {
    if (darkMode) {
        document.documentElement.classList.add('dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}
applyTheme();

// Theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode ? '1' : '0');
        applyTheme();
    });
}

// Load profiles
fetch('/api/profiles')
    .then(res => res.json())
    .then(data => {
        profiles = data;
        renderCard();
    })
    .catch(err => console.error('Error:', err));

// Render current card
function renderCard() {
    if (!cardStack) return;
    cardStack.innerHTML = '';
    
    if (currentIndex >= profiles.length) {
        cardStack.innerHTML = '<div class="empty-text">Нет доступных профилей</div>';
        return;
    }
    
    const profile = profiles[currentIndex];
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-photo" style="background-image: url(${profile.photo || ''})"></div>
            <div class="card-info">
                <div class="card-name-age">${profile.name}, ${profile.age}</div>
                <div>${profile.city || ''}</div>
                <div>${profile.bio || ''}</div>
            </div>
            

// Next card
function nextCard() {
    currentIndex++;
    renderCard();
}

// Функция лайка
function handleLike() {
        if (currentIndex < profiles.length) {
                    const profile = profiles[currentIndex];
                    likedProfiles.push(profile);
                    localStorage.setItem('likedProfiles', JSON.stringify(likedProfiles));
                    nextCard();
                }
    }

// Функция дизлайка
function handleDislike() {
        nextCard();
    }

// Swipe handlers
let startX = 0;
if (cardStack) {
    cardStack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    cardStack.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 100) {
            nextCard();
        }
    });
    
    //     // }
    // 
// Create profile panel
if (createBtn) {
    createBtn.addEventListener('click', () => {
        if (createPanel) createPanel.setAttribute('aria-hidden', 'false');
    });
}

if (createClose) {
    createClose.addEventListener('click', () => {
        if (createPanel) createPanel.setAttribute('aria-hidden', 'true');
    });
}

// Save profile
if (createSave) {
    createSave.addEventListener('click', () => {
        const name = document.getElementById('create-name').value;
        const age = document.getElementById('create-age').value;
        const city = document.getElementById('create-city').value;
        const photo = document.getElementById('create-photo').value;
        const bio = document.getElementById('create-bio').value;
        
        if (!name || !age) {
            alert('Заполните имя и возраст');
            return;
        }
        
        myProfile = { name, age: parseInt(age), city, photo, bio };
        localStorage.setItem('myProfile', JSON.stringify(myProfile));
        alert('Профиль создан!');
        if (createPanel) createPanel.setAttribute('aria-hidden', 'true');
    });
}

// View my profile
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        const saved = localStorage.getItem('myProfile');
        if (saved) {
            myProfile = JSON.parse(saved);
            const msg = `Ваш профиль:\nИмя: ${myProfile.name}\nВозраст: ${myProfile.age}\nГород: ${myProfile.city || 'не указан'}\nО себе: ${myProfile.bio || 'не указано'}`;
            if (confirm(msg + '\n\nУдалить профиль?')) {
                localStorage.removeItem('myProfile');
                myProfile = null;
                alert('Профиль удален');
            }
        } else {
            alert('У вас нет профиля. Создайте его!');
        }
    });
}

const likeBtn = document.getElementById('like-btn');
const skipBtn = document.getElementById('skip-btn');
const savedBtn = document.getElementById('saved-btn');
const likedPanel = document.querySelector('.liked-panel');
const likedList = document.querySelector('.liked-list');
let likedProfiles = JSON.parse(localStorage.getItem('likedProfiles') || '[]');

// Кнопка лайка
likeBtn?.addEventListener('click', () => {
    if (currentIndex < profiles.length) {
        const profile = profiles[currentIndex];
        likedProfiles.push(profile);
        localStorage.setItem('likedProfiles', JSON.stringify(likedProfiles));
        nextCard();
    }
});

// Кнопка скипа
skipBtn?.addEventListener('click', () => {
    nextCard();
});

savedBtn?.addEventListener('click', () => {
    renderLikedList();
    likedPanel?.setAttribute('aria-hidden', 'false');
});


    // Кнопка закрытия панели понравившихся
    const backBtn = document.querySelector('.back-btn');
    backBtn?.addEventListener('click', () => {
            likedPanel?.setAttribute('aria-hidden', 'true');
        });
function renderLikedList() {
    if (!likedList) return;
    likedList.innerHTML = '';
    likedProfiles.forEach(profile => {
        const item = document.createElement('div');
        item.className = 'liked-item';
        item.innerHTML = `
            <div>${profile.name}, ${profile.age}</div>
            <div>${profile.city}</div>
        `;
        likedList.appendChild(item);
    });
}

const createPreview = document.getElementById('create-preview');
const createPreviewArea = document.querySelector('.create-preview-area');

createPreview?.addEventListener('click', () => {
    const name = document.getElementById('create-name').value;
    const age = document.getElementById('create-age').value;
    // ... остальные поля
    
    createPreviewArea.innerHTML = `
        <div class="card" style="position: relative; height: 320px;">
            <!-- preview карточки -->
        </div>
    `;
    createPreviewArea.setAttribute('aria-hidden', 'false');
});

// Обработчики для кнопок нижней панели
const bottomLikeBtn = document.getElementById('bottom-like-btn');
const bottomDislikeBtn = document.getElementById('bottom-dislike-btn');

bottomLikeBtn?.addEventListener('click', () => {
    handleLike();
    });

    bottomDislikeBtn?.addEventListener('click', () => {
        handleDislike();
        });
