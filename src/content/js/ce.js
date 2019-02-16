class CE extends mosyrejs2.Clay {
    constructor(agr) {
        super(agr)
        let zoom = 1, pos = [0, 0];
        Object.defineProperties(this, {
            "zoom": {
                get: () => zoom,
                set: (v) => {
                    zoom = Math.max(v, 0.05)
                    this._applyTransforms()
                }
            },
            "pos": {
                get: () => pos,
                set: (v) => {
                    pos = v
                    this._applyTransforms()
                }
            }
        })
        this.defineAgreement("canvas", document.createElement("svg"))
        
        this.init()

        if (agr.zoom !== undefined)
            this.zoom = agr.zoom;
        if (agr.pos !== undefined)
            this.pos = agr.pos

    }

    disableTransform(layerName){
        this.__.layers.every(l=>{
            if(l.name === layerName){
                l.transformable = 0;
                l.layer.removeAttribute("transform");
                return false;
            }
            return true;
        })
        
    }

    init(agr) {
        let { canvas, layers } = this.agreement;

        let lnames = layers || ["default"]
        this.__.layers = [];

        lnames.forEach(name => {
            let layer = document.createElementNS(canvas.namespaceURI, "g")
            this.__.layers.push({
                name,
                layer,
                transformable:1
            })
            canvas.appendChild(layer);
        });

    }

    zoomTo(z, atPx) {
        z = Math.max(z, 0.05)
        let w1 = this.toWorldScale(atPx);
        let w2 = CE.calWorldScale(atPx, z);
        let dx = [w1[0] - w2[0], w1[1] - w2[1]]
        this.pos[0] += dx[0];
        this.pos[1] += dx[1];
        this.zoom = z;
    }

    zoom(dz, atPx) {
        this.zoomTo(this.zoom + dz, atPx);
    }

    zoomWRect(wrect, autoCenter) {
        autoCenter = autoCenter ? 1 : 0;
        let { canvas } = this.agreement;
        let cl = [canvas.clientWidth, canvas.clientHeight] //Calculate from scale 1
        let z, xe = 0, ye = 0;
        if (wrect.w > wrect.h) {
            z = cl[0] / wrect.w;
        }
        else {
            z = cl[1] / wrect.h;
        }

        let center = [wrect.x + wrect.w * .5 * autoCenter, wrect.y + wrect.h * .5 * autoCenter]
        this.lookAt(center, z);
    }

    zoomVRect(vrect, autoCenter) {
        let [w, h] = this.toWorldScale([vrect.w, vrect.h]);
        let [x, y] = this.view2World([vrect.x, vrect.y])
        this.zoomWRect({ x, y, w, h }, centerEnable)
    }

    toCenterOf(g) {
        let bb = g.getBBox()
        let cp = [bb.x + bb.width * .5, bb.y + bb.height * .5];
        this.lookAt(cp)
    }

    lookAt(p, z) {
        let { canvas } = this.agreement;
        z = z ? z : this.zoom
        let cl = CE.calWorldScale([canvas.clientWidth, canvas.clientHeight], z);
        this.pos[0] = p[0] - cl[0] * .5
        this.pos[1] = p[1] - cl[1] * .5
        this.zoom = z;
    }

    toViewScale(wp) {
        return CE.getScale(wp, this.zoom);
    }

    toWorldScale(vp) {
        return CE.getScale(vp, 1 / this.zoom);
    }

    world2View(wp) {
        return CE.world2View(wp, this.zoom, this.pos);
    }

    view2World(px) {
        return CE.view2World(px, this.zoom, this.pos);
    }

    _applyTransforms() {
        let transform = [`scale(${this.zoom})`, `translate(${-this.pos[0]}, ${-this.pos[1]})`].join(" ")
        this.__.layers.forEach(l => {
            l.transformable && l.layer.setAttribute("transform", transform);
        })

    }

    addElement(e, layer) {
        for (let l of this.__.layers) {
            if (!layer || layer === l.name) {
                l.layer.appendChild(e);
                return;
            }
        }
    }

    getLayer(layer) {
        for (let l of this.__.layers) {
            if (!layer || layer === l.name)
                return l.layer;
        }
    }

    clearLayers(layers)
    {
        for (let l of this.__.layers) {            
            if (layers && layers.indexOf(l.name)>=0)
            {
                let all = l.layer.childNodes;
                while(all.length)
                {
                    l.layer.removeChild(all[0])
                }                
            }
        }
    }

    createElement(name) {
        return document.createElementNS(this.agreement.canvas.namespaceURI, name)
    }

    static getScale(wp, z) {
        return [wp[0] * z, wp[1] * z]
    }

    static calWorldScale(wp, z) {
        return this.getScale(wp, 1 / z)
    }

    static world2View(wp, zoom, pos) {
        return [(wp[0] - pos[0]) * zoom, (wp[1] - pos[1]) * zoom]
    }

    static view2World(px, zoom, pos) {
        return [pos[0] + px[0] / zoom, pos[1] + px[1] / zoom]
    }
}