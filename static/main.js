// Basic dating app frontend
console.log('Dating app loaded!');

// Simple demo: load profiles from API
fetch('/api/profiles')
    .then(res => res.json())
    .then(data => {
        console.log('Loaded profiles:', data);
        renderProfiles(data);
    })
    .catch(err => console.error('Error loading profiles:', err));

function renderProfiles(profiles) {
    const cardStack = document.querySelector('.card-stack');
    if (!cardStack) return;
    
    if (profiles.length === 0) {
        cardStack.innerHTML = '<div class="empty-text">Нет доступных профилей</div>';
        return;
    }
    
    const profile = profiles[0];
    const card = createCard(profile);
    cardStack.innerHTML = '';
    cardStack.appendChild(card);
}

function createCard(profile) {
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
    return card;
}

// Setup button handlers
document.getElementById('saved-btn')?.addEventListener('click', () => {
    document.querySelector('.liked-panel')?.setAttribute('aria-hidden', 'false');
});

document.querySelector('.back-btn')?.addEventListener('click', () => {
    document.querySelector('.liked-panel')?.setAttribute('aria-hidden', 'true');
});

document.getElementById('who-liked-btn')?.addEventListener('click', () => {
    document.querySelector('.who-liked-panel')?.setAttribute('aria-hidden', 'false');
});

document.querySelector('.who-back-btn')?.addEventListener('click', () => {
    document.querySelector('.who-liked-panel')?.setAttribute('aria-hidden', 'true');
});

document.getElementById('create-btn')?.addEventListener('click', () => {
    document.querySelector('.create-panel')?.setAttribute('aria-hidden', 'false');
});

document.querySelector('.create-close')?.addEventListener('click', () => {
    document.querySelector('.create-panel')?.setAttribute('aria-hidden', 'true');
});
