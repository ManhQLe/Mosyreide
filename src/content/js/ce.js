class CE extends mosyrejs2.Clay {
    constructor(agr) {
        super(agr)
        let zoom = 1, pos = [0, 0], zoomRate = 0.1;
        Object.defineProperties(this, {
            "zoom": {
                get: () => zoom,
                set: (v) => {
                    zoom = Math.max(v, 0.01)
                    this.applyTransforms()
                }
            },
            "pos": {
                get: () => pos,
                set: (v) => {
                    pos = v
                    this.applyTransforms()
                }
            },
            "zoomRate": {
                get: () => zoomRate,
                set: (v) => zoomRate = v
            }
        })
        this.defineAgreement("canvas", document.createElement("svg"))

        this.init()

        if (agr.zoom !== undefined)
            this.zoom = agr.zoom;
        if (agr.pos !== undefined)
            this.pos = agr.pos

    }

    init() {
        let { canvas } = this.agreement;

        this.__.g = document.createElementNS(canvas.namespaceURI,"g");
        canvas.appendChild(this.__.g);
        let track = this.__.track = {
            x: 0,
            y: 0
        }

        d3.select(canvas).on("wheel", (e = d3.event) => {
            let rate = this.zoomRate;
            let nz = this.zoom + ((e.deltaY < 0) ? rate : -rate);
            this.zoomView([e.clientX,e.clientY],nz)            
        })

        d3.select(canvas).on("mousedown", (e = d3.event) => {
            track.x = e.clientX;
            track.y = e.clientY;
        })

        d3.select(canvas).on("mousemove", (e = d3.event) => {
            if (e.buttons == 1) {
                let zoom = this.zoom;
                let dx = track.x - e.clientX;
                let dy = track.y - e.clientY;
                let pos = this.pos;
                this.pos[0] += dx / zoom
                this.pos[1] += dy / zoom
                track.x = e.clientX;
                track.y = e.clientY;
                this.pos = pos;
            }
        })
    }

    zoomView(px,z){
        let cz = this.zoom;
        let cwp = CE.view2World(px,cz,this.pos);
        let nwp = CE.view2World(px,z,this.pos);        
        let dv = [cwp[0]-nwp[0],cwp[1]- nwp[1]]        
        this.pos[0]-=dv[0];
        this.pos[1]-=dv[1];
        this.zoom = z
    }

    getViewScale(wp){
        return CE.getViewScale(wp,this.zoom);
    }

    getWorldScale(vp){
        return CE.getWorldScale(p,this.zoom);
    }

    world2View(wp) {
        return CE.world2View(wp,this.zoom,this.pos);
    }

    view2World(px) {
        return CE.view2World(px,this.zoom,this.pos);        
    }

    applyTransforms() {
        let transforms = [];
        transforms[0] = `scale(${this.zoom})`;
        transforms[1] = `translate(${-this.pos[0]}, ${-this.pos[1]})`
        this.__.g.setAttribute("transform", transforms.join(" "));
    }

    static getWorldScale(vp,z){
        return [vp[0] / z,vp[1] / z]
    }

    static getViewScale(wp,z){
        return [wp[0] *z,wp[1] * z]
    }

    static world2View(wp,zoom,pos){
        return [(wp[0] - pos[0]) / zoom, (wp[1] - pos[1]) * zoom]
    }

    static view2World(px,zoom,pos){
        return [pos[0] + px[0] * zoom, pos[1] + px[1] * zoom]
    }
}