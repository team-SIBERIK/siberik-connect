
function toggleSection(gridId, arrow) {
    const grid = document.getElementById(gridId);
    const isExpanded = grid.classList.toggle('expanded');

    // Alterna la clase "rotated" en la flecha
    if (isExpanded) {
        arrow.classList.add('rotated');
    } else {
        arrow.classList.remove('rotated');
    }
}

async function loadCollaborators() {
    try {
        const response = await fetch('../../web/assets/colabs/colabs.json');
        const data = await response.json();
        generateSectionCards(data);
    } catch (error) {
        console.error('[ERROR] colab Json couldn`t be loaded:', error);
    }
}

// Genera todas las secciones dinámicamente
function generateSectionCards(data) {
    const sections = [
        { id: 'personas-grid', key: 'persons' },
        { id: 'entidades-grid', key: 'entities' },
        { id: 'empresas-grid', key: 'businesses' }
    ];

    sections.forEach(section => {
        const grid = document.getElementById(section.id);
        const items = data[section.key];

        if (!grid || !items) return;

        // Limpia el contenido actual
        grid.innerHTML = '';

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Imagen principal de la persona / entidad / empresa
            const img = document.createElement('img');
            img.src = item.photo || 'https://via.placeholder.com/200x200?text=Sin+Foto';
            img.alt = item.person_name || item.entity_name || item.business_name || 'Colaborador';
            card.appendChild(img);

            // Evento para abrir el modal correspondiente
            const modalId = `${section.key}-${index}-modal`;
            card.addEventListener('click', () => openModal(modalId));

            grid.appendChild(card);

            // Crear el modal para cada elemento
            createModal(item, modalId);
        });
    });
}

function createModal(item, modalId) {
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.classList.add('modal');

    // Construcción HTML del modal
    modal.innerHTML = `
    <div class="modal-content">
        <span class="close" onclick="closeModal('${modalId}')">&times;</span>
        <div class="profile-banner">
            <img src="${item.photo || 'https://via.placeholder.com/200x200?text=Sin+Foto'}" 
                 alt="${item.person_name || 'Foto'}" 
                 class="profile-pic">
        </div>
        <h2>${item.person_name || item.entity_name || item.business_name}</h2>

        <div class="socials">
            ${generateSocialLinks(item.url)}
        </div>

        <p>${item.description || 'Sin descripción disponible.'}</p>

        ${
            item.roles
                ? `
                <div class="roles-container">
                    <h3>Roles</h3>
                    <div class="roles-list">
                        ${item.roles
                            .map(role => `<div class="role-item">${role}</div>`)
                            .join('')}
                    </div>
                </div>`
                : ''
        }
    </div>
    `;

    document.body.appendChild(modal);
}

function generateSocialLinks(urls = {}) {
    let html = '';
    const icons = {
        github: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        linkedin: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
        website: 'https://cdn-icons-png.flaticon.com/512/84/84380.png',
        twitter: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
        instagram: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png'
    };

    for (const [key, value] of Object.entries(urls)) {
        if (value) {
            html += `
                <a href="${value}" target="_blank" aria-label="${key}">
                    <img src="${icons[key] || icons.website}" alt="${key}">
                </a>
            `;
        }
    }

    return html || '<p>Sin redes disponibles</p>';
}

document.addEventListener('DOMContentLoaded', loadCollaborators);
