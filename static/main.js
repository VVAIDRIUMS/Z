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
        </div>
    `;
    cardStack.appendChild(card);
}

// Next card
function nextCard() {
    currentIndex++;
    renderCard();
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
    
    cardStack.addEventListener('click', () => {
        nextCard();
    });
}

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
