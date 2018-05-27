(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define('evolution',[],b):'object'==typeof exports?exports.evolution=b():a.evolution=b()})('undefined'==typeof self?this:self,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)}([function(a,b,c){a.exports=c(1)},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});class d{static create(a,b,c){return new d(a,b,c)}constructor(a,b,c){this.values=Array(a.length),this.min=b,this.max=c,a.forEach((a,b)=>{this.set(b,a)})}clone(){const a=Object.assign(Object.create(this),this);return a.values=[...this.values],a}size(){return this.values.length}get(a){return this.values[a]}set(a,b){this.values[a]=b}swap(a,b){var c=[this.values[b],this.values[a]];this.values[a]=c[0],this.values[b]=c[1]}move(a,b){this.values.splice(b,0,...this.values.splice(a,1))}}class e extends d{static create(a,b,c){return new e(a,b,c)}constructor(a,b=-Infinity,c=Infinity){super(a,b,c)}set(a,b){if(b>=this.min&&b<=this.max)this.values[a]=b;else throw new TypeError}}class f extends e{static create(a){return new f(a)}constructor(a){super(a,0,1)}}class g{static create(a,b,c=Infinity,d=c){return new g(a.create(b),c,d)}constructor(a,b,c){this.chromosome=a,this.fitness=b,this.objective=c}clone(){const a=Object.assign(Object.create(this),this);return a.chromosome=this.chromosome.clone(),a}update(a){this.fitness=a.fitness(this),this.objective=a.objective(this)}}class h{static create(a,b,c){return new h(a,b,c)}constructor(a,b,c){this.individuals=[],c.forEach((a)=>{this.individuals.push(g.create(b,a))}),this.selection=0,this.size=a}add(a){this.exists(a)||(this.full()&&this.removeWorstFittest(),!this.full()&&this.individuals.push(a))}full(){return this.individuals.length===this.size}exists(a){const b=[];return this.individuals.forEach((a)=>{b.push(a.chromosome.values.toString())}),b.includes(a.chromosome.values.toString())}select(){const a=this.individuals[this.selection];return this.selection=(this.selection+1)%this.individuals.length,a}getBest(){let a={objective:Infinity};return this.individuals.forEach((b)=>{b.objective<a.objective&&(a=b)}),a}sort(){this.selection=0,this.individuals.sort((a,b)=>{if(a.fitness<b.fitness)return-1;return a.fitness>b.fitness?1:0})}removeWorstFittest(a=1){this.sort();const b=this.getBest();for(let c=a;0<c&&2<this.individuals.length;){const a=[].concat(this.individuals).pop();this.individuals=this.individuals.slice(0,-1),a===b?this.individuals=[a].concat(this.individuals):c-=1}}}class i{before(){}beforeEach(){}fitness(){return Infinity}objective(a){return this.fitness(a)}mutation(a){return a.clone()}crossover(a,b){return a.fitness<b.fitness?a.clone():b.clone()}afterEach(){}after(){}}class j{static init(a=0){j.i=0,j.j=0,j.keystream=j.keyStream(`${a}`)}static keyStream(a){const b=[];let c=0;for(let c=0;256>c;c+=1)b[c]=c;for(let d=0;256>d;d+=1){c=(c+b[d]+a[d%a.length].charCodeAt(0))%256;const e=b[d];b[d]=b[c],b[c]=e}return b}static randomByte(){j.i=(j.i+1)%256,j.j=(j.j+j.keystream[j.i])%256;const a=j.keystream[j.i];return j.keystream[j.i]=j.keystream[j.j],j.keystream[j.j]=a,j.keystream[(j.keystream[j.i]+j.keystream[j.j])%256]}static get(){j.keystream||j.init('seed');const a=(j.randomByte()+256*j.randomByte()+65536*j.randomByte()+16777216*j.randomByte()+4294967296*j.randomByte()+1099511627776*j.randomByte()+281474976710656*j.randomByte()+72057594037927940*j.randomByte())/18446744073709552000;return a}static getInteger(a){return Math.floor(j.get()*a)}}class k{static run(a,b,c,d=0.5,e=0.5,f=0){j.init(f);const g=new k(a,c,b,d,e,f);return g.evolve(),g}constructor(a,b,c,d,e){this.iterations=0,this.stopped=!1,this.population=a,this.functions=new c,this.population.individuals.forEach((a)=>{a.update(this.functions)}),this.generations=b,this.mutationProbability=d,this.crossoverProbability=e}evolve(){for(this.functions.before(this);this.hasNext()&&!this.hasStopped();)this.functions.beforeEach(this),this.next(),this.functions.afterEach(this);this.functions.after(this)}next(){this.iterations<this.generations&&(j.get()<this.mutationProbability&&this.mutation(),j.get()<this.crossoverProbability&&this.crossover(),++this.iterations)}hasNext(){return this.iterations<this.generations}stop(){this.stopped=!0}hasStopped(){return this.stopped}mutation(){const a=this.functions.mutation(this.population.select());a.update(this.functions),this.population.add(a)}crossover(){const a=this.functions.crossover(this.population.select(),this.population.select());a.update(this.functions),this.population.add(a)}}c.d(b,'Chromosome',function(){return d}),c.d(b,'IntegerChromosome',function(){return e}),c.d(b,'BitChromosome',function(){return f}),c.d(b,'Individual',function(){return g}),c.d(b,'Population',function(){return h}),c.d(b,'DefaultFunctions',function(){return i}),c.d(b,'RandomNumber',function(){return j}),c.d(b,'GeneticAlgorithm',function(){return k})}])});
//# sourceMappingURL=index.js.map