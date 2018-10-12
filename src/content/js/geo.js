const GEO = {
    ep: 1e-8,
    isEqual(x1,x2){
        return Math.abs(x1-x2)<=this.ep;
    },
    isOverlap(a,b){
        return a[1] >= b[0] && a[0]<=b[1]
    },
    rectOverlap(r1,r2){
        return this.isOverlap([r1.x,r1.x+r1.w],[r2.x,r2.x+r2.w])
            && this.isOverlap([r1.y,r1.y+r1.h],[r2.y,r2.y+r2.h])
    },
    solveQuad(a,b,c){
        let delta = b * b - 4 * a * c;
        if (delta < 0)
            return [];
        else {
            let a2 = 1 / (2 * a);
            if (this.isEqual(delta, 0.0))
                return [-b * a2];
            else {
                delta = Math.sqrt(delta);
                return [(-b + delta) * a2, (-b - delta) * a2]
            }
        }
    },
    findMinMaxPoints(Ps){
        let minP = [Infinity,Infinity]
        let maxP = [-Infinity,-Infinity]
        Ps.forEach(p => {
            minP[0] = Math.min(minP[0], p[0])
            minP[1] = Math.min(minP[1], p[1])
    
            maxP[0] = Math.max(maxP[0], p[0])
            maxP[1] = Math.max(maxP[1], p[1])
        });
        
        return [minP, maxP]
    }        
}
