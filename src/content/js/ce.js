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

        if (agr.zoom !== undefined)
            this.zoom = agr.zoom;
        if (agr.pos !== undefined)
            this.pos = agr.pos

        this.defineAgreement("canvas", document.createElement("svg"))

        this.init()
    }

    init() {
        let { canvas } = this.agreement;

        let g = this.__.d3g = d3.select(canvas).append("g");
        let track = this.__.track = {
            x: 0,
            y: 0
        }

        d3.select(canvas).on("wheel", (e = d3.event) => {
            let rate = this.zoomRate;
            this.zoom += (e.deltaY < 0) ? rate : -rate;
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

    toWorld2View(p) {
        return [p[0] * this.zoom, p[1] * this.zoom]
    }

    toView2World(px) {
        return [p[0] * this.zoom, p[1] * this.zoom]
    }

    applyTransforms() {
        let transforms = [];
        transforms[0] = `scale(${this.zoom})`;
        transforms[1] = `translate(${-this.pos[0]}, ${-this.pos[1]})`
        this.__.d3g.attr("transform", transforms.join(" "));
    }
}