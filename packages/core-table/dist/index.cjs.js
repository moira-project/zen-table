'use strict';

const Primary = () => {
    const button = document.createElement('button');
    button.innerText = 'Click Me!!!!~!~';
    button.onclick = () => alert('Button clicked!');
    return button;
};

const Table = () => {
    const button = document.createElement('button');
    button.innerText = 'Table!!!!!~!~';
    button.onclick = () => alert('Button clicked!');
    return button;
};

exports.Primary = Primary;
exports.Table = Table;
//# sourceMappingURL=index.cjs.js.map
