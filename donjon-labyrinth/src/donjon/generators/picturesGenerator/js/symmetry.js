export function symmetry(x, y, char) {
    const changes = [];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const zone = [{ x, y }];
    const targetChar = getCharAt(x, y);
}