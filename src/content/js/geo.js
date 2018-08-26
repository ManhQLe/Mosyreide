const GEO = {
    ep: 1e-8,
    isEqual(x1,x2){
        return Math.abs(x1-x2)<=this.ep;
    },
    isOverlap(a,b){
        return a[1] >= b[0] && a[0]<=b[1]
    },
    rectOverlap(r1,r2){
        return this.isOverlap([r1[0],r1[0]+r1[2]],[r2[0],r2[0]+r2[2]])
             && this.isOverlap([r1[1],r1[1]+r1[3]],[r2[1],r2[1]+r2[3]])
    },
    
}