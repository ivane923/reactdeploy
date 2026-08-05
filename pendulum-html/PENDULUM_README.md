# Pendulum Standalone HTML

This is a standalone version of the Pendulum interactive animation extracted from the Hey Communications Laravel application.

## File Structure

```
/Applications/MAMP/htdocs/pendulum/
├── Pendulum.html                 # Main standalone HTML file
└── assets/
    ├── audio/
    │   └── pendulum-audio-effect.mp3    # Audio effect for pendulum animation
    ├── css/
    │   ├── app.css                      # Main application styles
    │   └── swiper-bundle.min.css        # Swiper slider library styles
    ├── img/
    │   ├── favico.png                   # Favicon
    │   ├── hey-logo.png                 # Hey Communications logo
    │   ├── pendulum-ball-1.png          # Pendulum ball image
    │   ├── wwd-instruction.png          # "What We Do" instruction image
    │   └── landing/
    │       └── drag-right.png           # Drag instruction hand image
    └── js/
        ├── jquery-3.5.1.min.js          # jQuery library
        ├── swiper-bundle.min.js         # Swiper slider library
        ├── app-desktop.js               # Desktop interaction logic
        └── app-mobile.js                # Mobile/touch interaction logic
```

## Features

### Responsive Design
- **Desktop Mode**: Uses mouse events for dragging and rotating the pendulum
- **Mobile Mode**: Uses touch events for mobile/tablet devices
- Automatically detects device type and loads appropriate JavaScript

### Interactive Elements
1. **Drag Functionality**: The pendulum can be dragged around the screen
2. **Rotation**: Click/touch and rotate the pendulum ball to activate animation
3. **Text Animation**: Cycles through 9 different marketing messages:
   - "WE ARE YOUR CALL TO ACTION!"
   - "THE VOICE THAT HELPS YOU RISE ABOVE THE CLUTTER"
   - "STRATEGIC. INSIGHTFUL. EFFECTIVE."
   - "COMPLEMENTED WITH INNOVATIVE SOLUTIONS"
   - "SO YOUR MESSAGE CAN BE HEARD"
   - "FROM YOUR JOURNEY ON GROUND"
   - "TO YOUR MOMENTS ON-AIR"
   - "WE ARE YOUR BRANDS SHOUTOUT"
   - "FROM PURPOSE TO YOUR POINT OF SALE"

4. **Audio Effect**: Plays looping audio when pendulum animation is activated
5. **Preloader**: Shows loading animation while assets load

## How to Use

### Opening the File
Simply open `Pendulum.html` in any modern web browser:
- Chrome
- Firefox
- Safari
- Edge

### Interaction Instructions

**Desktop:**
1. Click and drag the pendulum ball to move it around
2. Click and rotate the pendulum ball at least 30 degrees
3. Release to start the animation
4. The pendulum will swing and text will cycle through messages

**Mobile/Tablet:**
1. Touch and drag the pendulum ball to move it
2. Touch and rotate the pendulum ball at least 10 degrees
3. Release to start the animation
4. The pendulum will swing and text will cycle through messages

## Technical Details

### Dependencies
- **jQuery 3.5.1**: For DOM manipulation and AJAX
- **Swiper Bundle**: For potential slider functionality
- **Google Fonts**: Montserrat font family

### Browser Compatibility
- Modern browsers with ES6 support
- Touch events for mobile devices
- Mouse events for desktop devices
- HTML5 audio support required

### Key JavaScript Functions

**Desktop (app-desktop.js):**
- Drag functionality using mouse events
- Rotation detection (minimum 30° to activate)
- Animation triggers

**Mobile (app-mobile.js):**
- Touch-based drag functionality
- Rotation detection (minimum 10° to activate)
- Swipe prevention during interaction

### Audio
- Format: MP3
- Behavior: Loops continuously when animation is active
- Auto-loads when pendulum slide becomes active

## Customization

### Changing Text Messages
Edit the `<h2 class="context-title">` elements in `Pendulum.html` (lines 123-131)

### Adjusting Rotation Threshold
- Desktop: Edit line 176 in `assets/js/app-desktop.js` (currently 30°)
- Mobile: Edit line 174 in `assets/js/app-mobile.js` (currently 10°)

### Styling
Modify `assets/css/app.css` for custom styling

## Notes

- All asset paths are relative to the root directory
- The file is completely self-contained with the `assets/` folder
- No server-side processing required
- Can be deployed to any static hosting service

## Original Source
Extracted from Hey Communications Laravel application
- Original location: `resources/views/home.blade.php` (lines 72-119)
- Original assets: `public/` directory

## License
© Hey Communications 360
