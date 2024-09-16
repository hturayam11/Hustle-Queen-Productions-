document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');
    const gallery = document.getElementById('gallery');

    // Base URL of the deployed API
    const apiUrl = 'https://your-api-service.onrender.com/api/images'; // Update with your deployed API URL

    // Fetch and display categories
    const fetchCategories = async () => {
        
        const categories = ['Nature', 'Portraits', 'Urban', 'Real Estate', 'Events'];

        categories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = category;
            a.onclick = (e) => {
                e.preventDefault();
                loadGallery(category);
            };
            li.appendChild(a);
            categoryList.appendChild(li);
        });
    };

    
    const loadGallery = async (category) => {
        gallery.innerHTML = ''; 

        try {
            const response = await fetch(`${apiUrl}?category=${category}`);
            const images = await response.json();

            images.forEach(image => {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                const img = document.createElement('img');
                img.src = image.url;
                img.alt = category;
                div.appendChild(img);
                gallery.appendChild(div);
            });

        } catch (error) {
            console.error('Error loading gallery:', error);
        }
    };

    fetchCategories(); 
});
