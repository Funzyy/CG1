export let Matrix3 = {

    // Creates a 3x3 row-major translation matrix, 
    // that translates 2D homogeneous points by tx in x direction and ty in y direction.
    translation: function (tx, ty) {
        // Lab 02, Aufgabe 3(a)
        // Index 2 ist x-Wert und Index 5 ist y-Wert
        return [
            1, 0, tx,
            0, 1, ty,
            0, 0, 1,
        ];
    },

    // Creates a 3x3 row-major rotation matrix, that rotates 2D homogeneous points anti-clockwise.
    rotation: function (angleInRadians) {
        // Lab 02, Aufgabe 3(a)
        return [
            Math.cos(angleInRadians), -Math.sin(angleInRadians), 0,
            Math.sin(angleInRadians), Math.cos(angleInRadians), 0,
            0,                          0,                      1,
        ];
    },

    // Creates a 3x3 row-major scale matrix, that scales 2D homogeneous points by sx in x and by sy in y direction.
    scaling: function (sx, sy) {
        // Lab 02, Aufgabe 3(a)
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1,
        ];
    },

    // Returns the product of two 3x3 matrices.
    multiply: function (a, b) {
        // Lab 03, Aufgabe 3(a)
        // Reihe * Spalte
        // Index:
        // 0, 1, 2,
        // 3, 4, 5,
        // 6, 7, 8,
        return [
            a[0]*b[0]+a[1]*b[3]+a[2]*b[6], a[0]*b[1]+a[1]*b[4]+a[2]*b[7], a[0]*b[2]+a[1]*b[5]+a[2]*b[8],
            a[3]*b[0]+a[4]*b[3]+a[5]*b[6], a[3]*b[1]+a[4]*b[4]+a[5]*b[7], a[3]*b[2]+a[4]*b[5]+a[5]*b[8],
            a[6]*b[0]+a[7]*b[3]+a[8]*b[6], a[6]*b[1]+a[7]*b[4]+a[8]*b[7], a[6]*b[2]+a[7]*b[5]+a[8]*b[8],
        ];

    },

    // Creates a 3x3 homogeneous matrix that scales a [-1;1]x[-1;1] coordinate frame
    // such that no skewing happens when mapping to a [0;w-1]x[0;h-1] pixel grid
    // w, h are the width and height of the pixel grid, respectively.
    aspect: function (w, h)
    {
        // Lab 02, Aufgabe 3(c)
        const sh = w > h ? w/h: 1;
        const sw = h > w ? h/w: 1;
        return [
            sw, 0, 0,
            0, sh, 0,
            0, 0, 1,
        ];

    }
};