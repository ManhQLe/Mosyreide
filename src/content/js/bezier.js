const BEZIER = {
    pointAt(t, P1, P2, P3, P4) {
        let t2 = t * t;
        let t3 = t2 * t;
        let onemt = (1 - t);
        let onemt2 = onemt * onemt;
        let onemt3 = onemt2 * onemt;
        let P = [0, 0]
        vec2.scaleAndAdd(P, P, P1, onemt3);
        vec2.scaleAndAdd(P, P, P2, 3 * t * onemt2);
        vec2.scaleAndAdd(P, P, P3, 3 * t2 * onemt);
        vec2.scaleAndAdd(P, P, P4, t3);
        return P;
    },
    tangent(t, P1, P2, P3, P4) {
        let t2 = t * t;
        let onemt = (1 - t);
        let onemt2 = onemt * onemt;
        let x = [0, 0]
        let temp = [0, 0]
        vec2.sub(temp, P2, P1)
        vec2.scaleAndAdd(x, x, temp, 3 * onemt2);

        vec2.sub(temp, P3, P2)
        vec2.scaleAndAdd(x, x, temp, 6 * t * onemt);

        vec2.sub(temp, P4, P3)
        vec2.scaleAndAdd(x, x, temp, 3 * t2);

        return x;
    },
    equilibriumParams(P1, P2, P3, P4) {
        let A = [0, 0],
            B = [0, 0],
            C = [0, 0]
        vec2.scaleAndAdd(A, A, P1, -3)
        vec2.scaleAndAdd(A, A, P2, 9)
        vec2.scaleAndAdd(A, A, P3, -9)
        vec2.scaleAndAdd(A, A, P4, 3)

        vec2.scaleAndAdd(B, B, P1, 6)
        vec2.scaleAndAdd(B, B, P2, -12)
        vec2.scaleAndAdd(B, B, P3, 6)

        vec2.scaleAndAdd(C, C, P2, 3)
        vec2.scaleAndAdd(C, C, P1, -3)

        return GEO.solveQuad(A[0], B[0], C[0])
            .concat(GEO.solveQuad(A[1], B[1], C[1]))
            .filter(x => x >= 0 && x <= 1);
    },
    equilibriumPoints(P1, P2, P3, P4) {
        return this.equilibriumParams(P1, P2, P3, P4)
            .map(t => this.pointAt(t, P1, P2, P3, P4))
    },
    boundingBox(P1, P2, P3, P4) {
        return GEO.findMinMaxPoints(this.equilibriumPoints().concat([P1, P2, P3, P4]))
    },
    closetPointTo(target, P1, P2, P3, P4) {
        let t1 = 0,
            t2 = 1;
        let gold = (Math.sqrt(5) - 1) * .5;
        let gt1,gt2,mp1,mp2,dm1,dm2,len
        while (true) {
            len = t2 - t1;
            if (len <= 1e-5)
                break;
            gt1 = t1 + len * gold;
            gt2 = t2 - len * gold;

            mp1 = this.pointAt(gt1,P1, P2, P3, P4)
            mp2 = this.pointAt(gt2,P1, P2, P3, P4)

            dm1 = vec2.dist(mp1, target)
            dm2 = vec2.dist(mp2, target)
            dm1 < dm2?(t1 = gt2):(t2 = gt1)            
        }
        return t1;
    }
}