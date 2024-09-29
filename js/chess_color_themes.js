// Change color scheme
function changeColorScheme(scheme) {
    const root = document.documentElement;
    switch (scheme) {
        case 'blue':
            root.style.setProperty('--primary-color', '#1e3a8a');
            root.style.setProperty('--secondary-color', '#3b82f6');
            root.style.setProperty('--background-color', '#e0f2fe');
            root.style.setProperty('--light-square', '#bfdbfe');
            root.style.setProperty('--dark-square', '#3b82f6');
            break;
        case 'green':
            root.style.setProperty('--primary-color', '#166534');
            root.style.setProperty('--secondary-color', '#22c55e');
            root.style.setProperty('--background-color', '#dcfce7');
            root.style.setProperty('--light-square', '#bbf7d0');
            root.style.setProperty('--dark-square', '#22c55e');
            break;
        case 'red':
            root.style.setProperty('--primary-color', '#991b1b');
            root.style.setProperty('--secondary-color', '#ef4444');
            root.style.setProperty('--background-color', '#fee2e2');
            root.style.setProperty('--light-square', '#fecaca');
            root.style.setProperty('--dark-square', '#ef4444');
            break;
        case 'purple':
            root.style.setProperty('--primary-color', '#581c87');
            root.style.setProperty('--secondary-color', '#a855f7');
            root.style.setProperty('--background-color', '#f3e8ff');
            root.style.setProperty('--light-square', '#e9d5ff');
            root.style.setProperty('--dark-square', '#a855f7');
            break;
        case 'orange':
            root.style.setProperty('--primary-color', '#9a3412');
            root.style.setProperty('--secondary-color', '#f97316');
            root.style.setProperty('--background-color', '#ffedd5');
            root.style.setProperty('--light-square', '#fed7aa');
            root.style.setProperty('--dark-square', '#f97316');
            break;
        case 'teal':
            root.style.setProperty('--primary-color', '#115e59');
            root.style.setProperty('--secondary-color', '#14b8a6');
            root.style.setProperty('--background-color', '#ccfbf1');
            root.style.setProperty('--light-square', '#99f6e4');
            root.style.setProperty('--dark-square', '#14b8a6');
            break;
        case 'pink':
            root.style.setProperty('--primary-color', '#9d174d');
            root.style.setProperty('--secondary-color', '#ec4899');
            root.style.setProperty('--background-color', '#fce7f3');
            root.style.setProperty('--light-square', '#fbcfe8');
            root.style.setProperty('--dark-square', '#ec4899');
            break;
        case 'brown':
            root.style.setProperty('--primary-color', '#78350f');
            root.style.setProperty('--secondary-color', '#b45309');
            root.style.setProperty('--background-color', '#fef3c7');
            root.style.setProperty('--light-square', '#fde68a');
            root.style.setProperty('--dark-square', '#b45309');
            break;
        case 'gray':
            root.style.setProperty('--primary-color', '#1f2937');
            root.style.setProperty('--secondary-color', '#4b5563');
            root.style.setProperty('--background-color', '#f3f4f6');
            root.style.setProperty('--light-square', '#e5e7eb');
            root.style.setProperty('--dark-square', '#4b5563');
            break;
        case 'blackwhite':
            root.style.setProperty('--primary-color', '#000000');
            root.style.setProperty('--secondary-color', '#4b5563');
            root.style.setProperty('--background-color', '#ffffff');
            root.style.setProperty('--light-square', '#f3f4f6');
            root.style.setProperty('--dark-square', '#4b5563');
            break;
        case 'rainbow':
            root.style.setProperty('--primary-color', '#ff0000'); // Red
            root.style.setProperty('--secondary-color', '#ffa500'); // Orange
            root.style.setProperty('--background-color', '#ffff00'); // Yellow
            root.style.setProperty('--light-square', '#00ff00'); // Green
            root.style.setProperty('--dark-square', '#0000ff'); // Blue
            break;
        case 'rainbow-soft':
            root.style.setProperty('--primary-color', '#ff7f7f'); // Soft Red
            root.style.setProperty('--secondary-color', '#ffbf80'); // Soft Orange
            root.style.setProperty('--background-color', '#fff9b0'); // Soft Yellow
            root.style.setProperty('--light-square', '#b4ffb4'); // Soft Green
            root.style.setProperty('--dark-square', '#add8e6'); // Soft Blue
            break;
        case 'sunset':
            root.style.setProperty('--primary-color', '#ff4500'); // OrangeRed
            root.style.setProperty('--secondary-color', '#ff6347'); // Tomato
            root.style.setProperty('--background-color', '#ffefd5'); // PapayaWhip
            root.style.setProperty('--light-square', '#f0e68c'); // Khaki
            root.style.setProperty('--dark-square', '#ff8c00'); // DarkOrange
            break;
        case 'forest':
            root.style.setProperty('--primary-color', '#013220'); // Dark Green
            root.style.setProperty('--secondary-color', '#228b22'); // ForestGreen
            root.style.setProperty('--background-color', '#a9dfbf'); // Light Green
            root.style.setProperty('--light-square', '#77dd77'); // Pastel Green
            root.style.setProperty('--dark-square', '#006400'); // Dark Green
            break;
        case 'ocean':
            root.style.setProperty('--primary-color', '#00274d'); // Navy Blue
            root.style.setProperty('--secondary-color', '#0077be'); // Blue
            root.style.setProperty('--background-color', '#cfe0e8'); // Light Blue
            root.style.setProperty('--light-square', '#b3e5fc'); // Light Cyan
            root.style.setProperty('--dark-square', '#01579b'); // Dark Blue
            break;
        case 'candy':
            root.style.setProperty('--primary-color', '#ff69b4'); // HotPink
            root.style.setProperty('--secondary-color', '#ffb6c1'); // LightPink
            root.style.setProperty('--background-color', '#ffe4e1'); // MistyRose
            root.style.setProperty('--light-square', '#ff8c94'); // LightSalmonPink
            root.style.setProperty('--dark-square', '#ff1493'); // DeepPink
            break;
        case 'galaxy':
            root.style.setProperty('--primary-color', '#4b0082'); // Indigo
            root.style.setProperty('--secondary-color', '#800080'); // Purple
            root.style.setProperty('--background-color', '#6a0dad'); // DarkOrchid
            root.style.setProperty('--light-square', '#8a2be2'); // BlueViolet
            root.style.setProperty('--dark-square', '#000000'); // Black
            break;
        case 'lava':
            root.style.setProperty('--primary-color', '#e25822'); // Flame
            root.style.setProperty('--secondary-color', '#ff4500'); // OrangeRed
            root.style.setProperty('--background-color', '#ffa07a'); // LightSalmon
            root.style.setProperty('--light-square', '#ff6347'); // Tomato
            root.style.setProperty('--dark-square', '#800000'); // Maroon
            break;
        case 'ice':
            root.style.setProperty('--primary-color', '#00ffff'); // Cyan
            root.style.setProperty('--secondary-color', '#e0ffff'); // LightCyan
            root.style.setProperty('--background-color', '#f0f8ff'); // AliceBlue
            root.style.setProperty('--light-square', '#afeeee'); // PaleTurquoise
            root.style.setProperty('--dark-square', '#4682b4'); // SteelBlue
            break;
        case 'neon':
            root.style.setProperty('--primary-color', '#39ff14'); // Neon Green
            root.style.setProperty('--secondary-color', '#f72585'); // Neon Pink
            root.style.setProperty('--background-color', '#0d0d0d'); // Almost Black
            root.style.setProperty('--light-square', '#3a0ca3'); // Neon Purple
            root.style.setProperty('--dark-square', '#7209b7'); // Neon Violet
            break;
        case 'metallic':
            root.style.setProperty('--primary-color', '#b0c4de'); // Light Steel Blue
            root.style.setProperty('--secondary-color', '#dcdcdc'); // Gainsboro
            root.style.setProperty('--background-color', '#d3d3d3'); // Light Gray
            root.style.setProperty('--light-square', '#c0c0c0'); // Silver
            root.style.setProperty('--dark-square', '#808080'); // Gray
            break;
        case 'pastel':
            root.style.setProperty('--primary-color', '#ffb3ba'); // Pastel Pink
            root.style.setProperty('--secondary-color', '#ffdfba'); // Pastel Orange
            root.style.setProperty('--background-color', '#ffffba'); // Pastel Yellow
            root.style.setProperty('--light-square', '#baffc9'); // Pastel Green
            root.style.setProperty('--dark-square', '#bae1ff'); // Pastel Blue
            break;
        case 'vintage':
            root.style.setProperty('--primary-color', '#c08552'); // Tawny Brown
            root.style.setProperty('--secondary-color', '#a67c52'); // Dark Tan
            root.style.setProperty('--background-color', '#ede0d4'); // Light Taupe
            root.style.setProperty('--light-square', '#d4a373'); // Light Brown
            root.style.setProperty('--dark-square', '#806d5a'); // Coffee Brown
            break;
        case 'space':
            root.style.setProperty('--primary-color', '#2c3e50'); // Dark Slate Blue
            root.style.setProperty('--secondary-color', '#34495e'); // Midnight Blue
            root.style.setProperty('--background-color', '#95a5a6'); // Grayish Blue
            root.style.setProperty('--light-square', '#7f8c8d'); // Warm Gray
            root.style.setProperty('--dark-square', '#2c3e50'); // Dark Slate Blue
            break;
        }
    updateParticlesColor();
}

