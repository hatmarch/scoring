const canvas192 = document.createElement('canvas');
canvas192.width = 192;
canvas192.height = 192;
const ctx192 = canvas192.getContext('2d');

// Create a red background
ctx192.fillStyle = '#d12d36';
ctx192.fillRect(0, 0, 192, 192);

// Draw a white heart
ctx192.fillStyle = 'white';
ctx192.beginPath();
ctx192.moveTo(96, 60);
ctx192.bezierCurveTo(96, 50, 86, 30, 56, 30);
ctx192.bezierCurveTo(16, 30, 16, 90, 16, 90);
ctx192.bezierCurveTo(16, 120, 36, 150, 96, 170);
ctx192.bezierCurveTo(156, 150, 176, 120, 176, 90);
ctx192.bezierCurveTo(176, 90, 176, 30, 136, 30);
ctx192.bezierCurveTo(106, 30, 96, 50, 96, 60);
ctx192.fill();

// Export the icon
const img192 = document.createElement('a');
img192.href = canvas192.toDataURL('image/png');
img192.download = 'hearts-icon-192.png';
document.body.appendChild(img192);
img192.click();
document.body.removeChild(img192);

// Now create the 512x512 version
const canvas512 = document.createElement('canvas');
canvas512.width = 512;
canvas512.height = 512;
const ctx512 = canvas512.getContext('2d');

// Create a red background
ctx512.fillStyle = '#d12d36';
ctx512.fillRect(0, 0, 512, 512);

// Draw a white heart
ctx512.fillStyle = 'white';
ctx512.beginPath();
ctx512.moveTo(256, 160);
ctx512.bezierCurveTo(256, 120, 226, 80, 150, 80);
ctx512.bezierCurveTo(50, 80, 50, 230, 50, 230);
ctx512.bezierCurveTo(50, 320, 100, 400, 256, 460);
ctx512.bezierCurveTo(412, 400, 462, 320, 462, 230);
ctx512.bezierCurveTo(462, 230, 462, 80, 362, 80);
ctx512.bezierCurveTo(286, 80, 256, 120, 256, 160);
ctx512.fill();

// Export the icon
const img512 = document.createElement('a');
img512.href = canvas512.toDataURL('image/png');
img512.download = 'hearts-icon-512.png';
document.body.appendChild(img512);
img512.click();
document.body.removeChild(img512);