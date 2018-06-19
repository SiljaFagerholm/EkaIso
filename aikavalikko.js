// JavaScript source code
var picker = rome(input); // rome.find(input) also returns picker

toggle.addEventListener('click', function () {
    if (picker.restore) {
        picker.restore();
    } else {
        picker.destroy();
    }
});
