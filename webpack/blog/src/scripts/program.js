import {register} from './elasticity'

import {QuadEdge, DEdge} from './quadedge'

let edge = QuadEdge.build()
console.log(edge[0].rot().rot())

// import '../style/style.css';

register()
