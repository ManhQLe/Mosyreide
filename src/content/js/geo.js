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
    }
}