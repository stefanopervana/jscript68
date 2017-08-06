import Layout from '../components/layout'

export default () => (
  <Layout title='Chapter 2'>
    <div>
          <style jsx>{`
     	.chapter {font-family: Verdana; background-color: #6081ac; color: #CEDDF1; font-size: 120px; padding: 0.5em; }
     	.col-md-6 {border-radius: 4px; overflow: hidden; box-shadow: 0 9px 9px rgba(0, 0, 0, 0.9); display: block; min-height: 70%; font-family: Verdana; max-width: 1100px; background-color: #CEDDF1; margin: auto; margin-top: auto; margin-right: auto; margin-bottom: auto; margin-left: auto; white-space: pre-wrap; border: none; box-sizing: border-box; color: #2D0D0D; line-height: 1.1; padding: 4.7em} .home {margin: 1.5em 0;} 
     	h1 {color: #867452; font-size: 60px;} 
     	h2 {color: #867452; font-size: 40px} 
     	h3 {color: #867452; font-size: 30px} 
     	.it, .listit {color: brown; font-size: 24px; font-style: italic; letter-spacing: 0.04em; } 
     	.p, .listitem {color: #75AFAD; font-size: 24px; font-style: italic; letter-spacing: 0.04em;} pre {display: block; font-family: monospace; white-space: pre; margin: 1em 0; font-size: 16px} 
     	code{margin: auto; font-family:"Lucida Console"; "Andale Mono"; "Courier New"; Courier; monospace; font-style:normal; color:#395C73;} 
     	code strong {color:#000; background:#F5FD11; padding:1px; font-weight:normal;} 
     	.interno {font-family: verdana; font-style: italic; color: #395C73; font-size: 24px;} 
     	.sub{text-decoration: underline;} 
     	.im {color: #04445c;} 
     	.re {color: #650669;} .sub{text-decoration: underline; } blockquote {color: #111AD5; font-size: 24px; font-style: italic; letter-spacing: 0.04em;} 
     	.note { padding:3px; background: orange; margin-top: 1em; margin-bottom: 1em; margin-left: 40px; margin-right: 40px;}
     	`}</style>

    <div className="col-md-6"> 
<p className="chapter">2</p>
<h1>Variable Scope</h1>
<p className="it">El alcance es como el oxígeno para un programador. Está en todas partes. A menudo ni siquiera piensas en ello. Pero cuando se contamina. . . Te ahogas</p>
<p className="p">Scope is like oxygen to a programmer. It’s everywhere. You often don’t even think about it. But when it gets polluted . . . you choke.</p>
<p className="it">La buena noticia es que las reglas básicas de JavaScript son sencillas, bien diseñadas e increíblemente potentes. Pero hay excepciones. Trabajar eficazmente con JavaScript requiere dominar algunos conceptos básicos de scope variable, así como los casos de esquina que pueden conducir a problemas sutiles pero desagradables.</p>
<p className="p">The good news is that JavaScript’s core scoping rules are simple, well designed, and incredibly powerful. But there are exceptions. Working effectively with JavaScript requires mastering some basic concepts of variable scope as well as the corner cases that can lead to subtle but nasty problems.</p>

<h3>Item 8: Minimize Use of the Global Object</h3>
<p className="it">JavaScript hace que sea fácil crear variables en su espacio de nombres global. Las variables globales toman menos esfuerzo para crear, ya que no requieren ningún tipo de declaración, y son accesibles automáticamente a todo el código a lo largo del programa. Esta conveniencia hace que sea una tentación fácil para los principiantes. Pero los programadores experimentados saben evitar variables globales. La definición de variables globales contamina el espacio de nombres común compartido por todos, introduciendo la posibilidad de colisiones de nombres accidentales. Los globales van contra el grano de la modularidad: conducen al acoplamiento innecesario entre los componentes separados de un programa. Tan conveniente como puede ser "codificar ahora y organizar más adelante", los mejores programadores constantemente prestan atención a la estructura de sus programas,</p>
<p className="p">JavaScript makes it easy to create variables in its global namespace. Global variables take less effort to create, since they don’t require  any kind of declaration, and they are automatically accessible to all code throughout the program. This convenience makes them an easy temptation for beginners. But seasoned programmers know to avoid global variables. Defining global variables pollutes the common namespace shared by everyone, introducing the possibility of accidental name collisions. Globals go against the grain of modularity: They lead to unnecessary coupling between separate components of a program. As convenient as it may be to “code now and organize later,” the best programmers constantly pay attention to the structure of their programs, continuously grouping related functionality and separating unrelated components as a part of the programming process.</p>
<p className="it">Dado que el espacio de nombres global es la única forma real de interactuar con componentes independientes de un programa JavaScript, algunos usos del espacio de nombres global son inevitables. Un componente o biblioteca tiene que definir un nombre global para que otras partes del programa puedan utilizarlo. De lo contrario, es mejor mantener las variables lo más locales posible. Ciertamente es posible escribir un programa con nada más que variables globales, pero es pedir problemas. Incluso funciones muy simples que definen sus</p>
<p className="p">Since the global namespace is the only real way for separate components of a JavaScript program to interact, some uses of the global namespace are unavoidable. A component or library has to define a global name so that other parts of the program can use it. Otherwise, it’s best to keep variables as local as possible. It’s certainly possible  to write a program with nothing but global variables, but it’s asking for trouble. Even very simple functions that define their temporary</p>
<p className="it">Las variables globales tendrían que preocuparse si cualquier otro código podría usar esos mismos nombres de variables:</p>
<p className="p">variables globally would have to worry whether any other code might use those same variable names:</p>
<pre><code>
var i, n, sum; // globals<br></br>
function averageScore(players) &#123; sum = 0;<br></br>
for (i = 0, n = players.length; i &#60; n; i++) &#123; sum += score(players[i]);<br></br>
&#125;<br></br>
return sum / n;<br></br>
&#125;<br></br>
</code></pre>
<p className="it">Esta definición de averageScore no funcionará si la función de puntuación de la que depende depende de cualquiera de las mismas variables globales para sus propios fines:</p>
<p className="p">This definition of averageScore won’t work if the score function it depends on uses any of the same global variables for its own purposes:</p>
<pre><code>
var i, n, sum; // same globals as averageScore!<br></br>
function score(player) &#123; sum = 0;<br></br>
for (i = 0, n = player.levels.length; i &#60; n; i++) &#123; sum += player.levels[i].score;<br></br>
&#125;<br></br>
return sum;<br></br>
&#125;
</code></pre>
<p className="it">La respuesta es mantener estas variables locales en la parte del código que las necesita:</p>
<p className="p">The answer is to keep such variables local to just the portion of code that needs them:</p>
<pre><code>
function averageScore(players) &#123;<br></br>
var i, n, sum; sum = 0;<br></br>
for (i = 0, n = players.length; i &#60; n; i++) &#123; sum += score(players[i]);<br></br>
	&#125;<br></br>
return sum / n;<br></br>
&#125;<br></br>
<br></br>
function score(player) &#123;<br></br>
var i, n, sum; sum = 0;<br></br>
for (i = 0, n = player.levels.length; i &#60; n; i++) &#123; sum += player.levels[i].score;<br></br>
	&#125;<br></br>
return sum;<br></br>
&#125;
</code></pre>
<p className="it">El espacio de nombres global de JavaScript también se expone como un objeto global,</p>
<p className="p">JavaScript’s  global  namespace  is  also  exposed  as  a  global object,</p>
<p className="it">Que es accesible en la parte superior de un programa como el valor inicial de la palabra clave <code>this</code>. En los navegadores web, el objeto global también está enlazado a la variable de ventana global. La adición o modificación de variables globales actualiza automáticamente el objeto global:</p>
<p className="p">which is accessible at the top of a program as the initial value of the <code>this</code> keyword. In web browsers, the global object is also bound to the global window variable. Adding or modifying global variables automatically updates the global object:</p>
<pre><code>
this.foo; // undefined foo = "global foo"; <code>this</code>.foo; // "global foo"
</code></pre>
<p className="it">Del mismo modo, la actualización del objeto global actualiza automáticamente el espacio de nombres global:</p>
<p className="p">Similarly, updating the global object automatically updates the global namespace:</p>
<pre><code>
var foo = "global foo"; <code>this</code>.foo = "changed"; foo; // "changed"
</code></pre>
<p className="it">Esto significa que tiene dos mecanismos para elegir para crear una variable global: Puede declararla con <code>var</code> en el scope global o puede agregarla al objeto global. O bien funciona, pero la declaración <code>var</code> tiene el beneficio de transmitir más claramente el efecto sobre el alcance del programa. Dado que una referencia a una variable no unida da lugar a un error de tiempo de ejecución, hacer el alcance claro y simple hace más fácil para los usuarios de su código para entender qué globales declara.</p>
<p className="p">This means that you have two mechanisms to choose from for creating a global variable: You can declare it with <code>var</code> in the global scope, or you can add it to the global object. Either works, but the <code>var</code> declaration has the benefit of more clearly conveying the effect on the program’s scope. Given that a reference to an unbound variable results in a runtime error, making scope clear and simple makes it easier for users of your code to understand what globals it declares.</p>
<p className="it">Si bien lo mejor es limitar su uso del objeto global, proporciona un uso particularmente indispensable. Dado que el objeto global proporciona una reflexión dinámica del entorno global, puede utilizarlo para consultar un entorno en ejecución para detectar qué características están disponibles en la plataforma. Por ejemplo, ES5 introdujo un nuevo objeto JSON global para leer y escribir el formato de datos JSON. Como recurso provisorio para implementar código en entornos que pueden o no han proporcionado el objeto JSON, puede probar el objeto global para detectar su presencia y proporcionar una implementación alternativa:</p>
<p className="p">While it’s best to limit your use of the global object, it does provide one particularly indispensable use. Since the global object provides a dynamic reflection of the global environment, you can use it to query a running environment to detect which features are available on the platform. For example, ES5 introduced a new global JSON object for reading and writing the JSON data format. As a stopgap for deploying code in environments that may or may not have yet provided the JSON object, you can test the global object for its presence and provide an alternate implementation:</p>
<pre><code>
if (!this.JSON) &#123;<br></br>
this.JSON = &#123;<br></br>
parse: ...,<br></br>
stringify: ...<br></br>
&#125;;<br></br>
&#125;
</code></pre>
<p className="it">Si ya está proporcionando una implementación de JSON, podría, por supuesto, simplemente utilizar su propia implementación incondicional. Sin embargo, las implementaciones integradas proporcionadas por el entorno del host son casi siempre preferibles: son muy probadas para la corrección y la conformidad con los estándares, ya menudo proporcionan un mejor rendimiento que una implementación de terceros.</p>
<p className="p">If you are already providing an implementation of JSON,  you could    of course simply use your own implementation unconditionally. But built-in implementations provided by the host environment are almost always preferable: They are highly tested for correctness and conformance to standards, and quite often provide better performance than a third-party implementation.</p>
<p className="it">La técnica de detección de funciones es especialmente importante en los navegadores web, donde el mismo código puede ser ejecutado por una gran variedad de navegadores y versiones de navegador. La detección de funciones es una forma relativamente fácil de hacer programas robustos a las variaciones en los conjuntos de características de la plataforma. La técnica se aplica también en otros lugares, como para compartir bibliotecas que funcionen tanto en el navegador como en los entornos de servidor JavaScript.</p>
<p className="p">The technique of feature detection is especially important in web browsers, where the same code may be executed by a wide variety    of browsers and browser versions. Feature detection is a relatively easy way to make programs robust to the variations in platform feature sets. The technique applies elsewhere, too, such as for sharing libraries that may work both in the browser and in JavaScript server environments.</p>
<h3>Things to Remember</h3>
<p className="it">✦ Evite declarar variables globales.</p>
<p className="p">✦	Avoid declaring global variables.</p>
<p className="it">✦ Declarar las variables lo más localmente posible.</p>
<p className="p">✦	Declare variables as locally as possible.</p>
<p className="it">✦ Evite agregar propiedades al objeto global.</p>
<p className="p">✦	Avoid adding properties to the global object.</p>
<p className="it">✦ Utilice el objeto global para la detección de funciones de plataforma.</p>
<p className="p">✦	Use the global object for platform feature detection.</p>

<h3>Item 9: Always Declare Local Variables</h3>
<p className="it">Si hay una cosa más problemática que una variable global, es una variable global no intencional. Desafortunadamente, las reglas de asignación variable de JavaScript hacen que sea demasiado fácil crear variables globales de forma accidental. En lugar de generar un error, un programa que asigna a una variable no unida simplemente crea una nueva variable global y se le asigna. Esto significa que el olvido de declarar una variable local en silencio la convierte en una variable global:</p>
<p className="p">If there’s one thing more troublesome than a global variable, it’s an unintentional global variable. Unfortunately, JavaScript’s variable assignment rules make it all too easy to create global variables accidentally. Instead of raising an error, a program that assigns to an unbound variable simply creates a new global variable and assigns to it. This means that forgetting to declare a local variable silently turns it into a global variable:</p>
<pre><code>
function swap(a, i, j) &#123; temp = a[i]; // global a[i] = a[j];<br></br>
a[j] = temp;<br></br>
&#125;
</code></pre>
<p className="it">Este programa logra ejecutar sin error, aunque la falta de una declaración <code>var</code> para la variable temp lleva a la creación accidental de una variable global. Una implementación correcta declara temp con var:</p>
<p className="p">This program manages to execute without error, even though the  lack of a <code>var</code> declaration for the temp variable leads to the accidental creation of a global variable. A proper implementation declares temp with var:</p>
<pre><code>
function swap(a, i, j) &#123; <code>var</code> temp = a[i]; a[i] = a[j];<br></br>
a[j] = temp;<br></br>
&#125;
</code></pre>
<p className="it">Definir intencionalmente variables globales es malo estilo, pero accidentalmente la creación de variables globales puede ser un verdadero desastre. Debido a esto, muchos programadores utilizan herramientas de pelusa, que inspeccionan el código fuente del programa para el mal estilo o posibles errores, ya menudo cuentan con la capacidad de informar usos de las variables no unidos. Típicamente, una herramienta de pelusa que comprueba para las variables no declaradas toma un conjunto proporcionado por el usuario de globals conocidos (tales como los que se espera que exista en el entorno de acogida, o globales definidos en archivos separados) y luego informa todas las referencias o asignaciones a variables que no son ni En la lista ni declarados en el programa. Vale la pena tomar un tiempo para explorar qué herramientas de desarrollo están disponibles para JavaScript.</p>
<p className="p">Purposefully creating global variables is bad style, but accidentally creating global variables can be a downright disaster. Because of <code>this</code>, many programmers use lint tools, which inspect your program’s source code for bad style or potential bugs, and often feature the ability to report uses of unbound variables. Typically, a lint tool that checks for undeclared variables takes a user-provided set of known globals (such as those expected to exist in the host environment,     or globals defined in separate files) and then reports any references or assignments to variables that are neither provided in the list nor declared in the program. It’s worth taking some time to explore what development tools are available for JavaScript. Integrating automated checks for common errors such as accidental globals into your development process can be a lifesaver.</p>

<p className="it"></p>
<p className="p"><h3>Things to Remember</h3></p>
<p className="it">✦ Siempre declare nuevas variables locales con var.</p>
<p className="p">✦	Always declare new local variables with var.</p>
<p className="it">✦ Considere el uso de herramientas de lint para ayudar a comprobar las variables no enlazadas.</p>
<p className="p">✦	Consider using lint tools to help check for unbound variables.</p>

<p className="it"></p>
<p className="p"><h3>Item 10: Avoid with</h3></p>
<p className="it">Pobre with. Probablemente no hay ninguna característica más difamados en JavaScript. Sin embargo, with su notoriedad llegó con honestidad: Cualquier conveniencia que pueda ofrecer, más que compensar por ellos en la falta de fiabilidad y la ineficiencia.</p>
<p className="p">Poor with. There is probably no single more maligned feature in JavaScript. Nevertheless, with came by its notoriety honestly: Whatever conveniences it may offer, it more than makes up for them in unreliability and inefficiency.</p>
<p className="it">Las motivaciones para with son comprensibles. Los programas a menudo necesitan llamar a una serie de métodos en secuencia en un solo objeto, y es conveniente evitar referencias repetidas al objeto:</p>
<p className="p">The motivations for with are understandable. Programs often need to call a number of methods in sequence on a single object, and it is convenient to avoid repeated references to the object:</p>
<pre><code>
function status(info) &#123;<br></br>
var widget = new Widget();<br></br>
with (widget) &#123; setBackground("blue"); setForeground("white");<br></br>
setText("Status: " + info); // ambiguous reference<br></br>
show();<br></br>
&#125;<br></br>
&#125;
</code></pre>
<p className="it">También es tentador usar con "importar" variables de objetos que sirven como módulos:</p>
<p className="p">It’s also tempting to use with to “import” variables from objects serving as modules:</p>
<pre><code>
function f(x, y) &#123;<br></br>
with (Math) &#123;<br></br>
return min(round(x), sqrt(y)); // ambiguous references<br></br>
&#125;<br></br>
&#125;
</code></pre>

<p className="it">En ambos casos, con hace que sea tentadoramente fácil extraer las propiedades de un objeto y vincularlas como variables locales en el bloque.</p>
<p className="p">In both cases, with makes it temptingly easy to extract the properties of an object and bind them as local variables in the block.</p>
<p className="it">Estos ejemplos parecen atractivos. Pero tampoco hace lo que se supone. Observe cómo ambos ejemplos tienen dos tipos diferentes de variables: las que esperamos referir a las propiedades del objeto con, como setBackground, round y sqrt, y aquellas que esperamos que se refieran a enlaces de variables externas, como info, x , Yy. Pero nada en la sintaxis realmente distingue estos dos tipos de variables: todos parecen variables.</p>
<p className="p">These examples look appealing. But neither actually does what it’s supposed to. Notice how both examples have two different kinds of variables: those that we expect to refer to properties of the with object, such as setBackground, round, and sqrt, and those that we expect to refer to outer variable bindings, such as info, x, and y. But nothing in the syntax actually distinguishes these two types of variables—they all just look like variables.</p>
<p className="it">De hecho, JavaScript trata todas las variables de la misma manera: las busca en el scope, comenzando con el scope más interno y trabajando su camino hacia el exterior. La instrucción with trata un objeto como si representara un scope de variable, por lo que dentro del bloque with, la búsqueda de variables comienza buscando una propiedad del nombre de variable dado. Si la propiedad no se encuentra en el objeto, la búsqueda continúa en scopes externos.</p>
<p className="p">In fact, JavaScript treats all variables the same: It  looks them up    in scope, starting with the innermost scope and working its way outward. The with statement treats an object as if it represented a variable scope, so inside the with block, variable lookup starts by searching for  a property of the given variable name. If the property   is not found in the object, then the search continues in outer scopes.</p>
<p className="it">La Figura 2.1 muestra un diagrama de la representación interna del motor de JavaScript del alcance de la función de estado mientras ejecuta el cuerpo de su sentencia con. Esto se conoce en la especificación ES5 como el entorno léxico (o cadena de alcance en las versiones anteriores del estándar). El alcance del entorno es proporcionado por el objeto widget. El siguiente scope tiene enlaces para la información de variables locales de la función y el widget. En el siguiente nivel hay un enlace para la función de estado. Observe cómo, en un scope normal, hay exactamente tantos enlaces almacenados en ese nivel del entorno como hay variables en ese scope local. Pero para el alcance, el conjunto de enlaces depende de lo que suceda estar en el objeto en un punto dado en el tiempo.</p>
<p className="p">Figure 2.1 shows a diagram of a JavaScript engine’s internal representation of the scope of the status function while executing the body of its with statement. This is known in the ES5 specification as the lexical environment (or scope chain in older versions of the standard). The innermost scope of the environment is provided by the widget object. The next scope out has bindings for the function’s local variables info and widget. At the next level is a binding for the status function. Notice how, in a normal scope, there are exactly as many bindings stored in that level of the environment as there are variables in that local scope. But for the with scope, the set of bindings is dependent on whatever happens to be in the object at a given point in time.</p>
<p className="it">¿Qué tan seguros estamos de que sabemos qué propiedades se encontrarán o no en el objeto con el que se proporcionó? Toda referencia a una variable externa en un bloque con implica implícitamente que no hay propiedad del mismo nombre en el objeto with o en cualquiera de sus objetos prototipo. Otras partes del programa que crean o modifican el con el objeto y sus prototipos no pueden compartir esos supuestos. Ciertamente, no debería tener que leer su código local para encontrar qué variables locales que está usando.</p>
<p className="p">How confident are we that we know what properties will or won’t be found on the object we provided to with? Every reference to an outer variable in a with block implicitly assumes that there is no property of the same name in the with object—or in any of its prototype objects. Other parts of the program that create or modify the with object   and its prototypes may not share those assumptions. They certainly should not have to read your local code to find what local variables you happen to be using.</p>
<p className="it">Este conflicto entre el espacio de variables y los espacios de nombres de objetos hace que los bloques sean extremadamente frágiles. Por ejemplo, si el objeto widget en el ejemplo anterior adquiere una propiedad info, entonces de repente el comportamiento de la función status usará esa propiedad en lugar del parámetro info de la función status. Esto podría suceder durante la evolución del código fuente si, por ejemplo, un programador decide que todos los widgets</p>
<p className="p">This conflict between variable scope and object namespaces makes with blocks extremely brittle. For example, if the widget object in the above example acquires an info property, then suddenly the behavior of the status function will use that property instead of the status function’s info parameter. This could happen during the evolution of the source code if, for example, a programmer decides that all widgets</p>
<pre><code>
.hasOwnProperty<br></br>
.toString<br></br>
.valueOf<br></br>

. . .<br></br>
</code></pre>

<p className="it">Widget.prototype</p>
<p className="p">Widget.prototype</p>
<p className="it">Figura 2.1 El entorno léxico (o "cadena de alcance") para la función de estado debe tener una propiedad info. Peor aún, algo podría agregar una propiedad info al objeto prototype Widget en tiempo de ejecución, haciendo que la función status comience a romperse en puntos impredecibles:</p>
<p className="p">Figure 2.1 Lexical environment (or “scope chain”) for the status function should have an info property. Worse, something could add an info property to the Widget prototype object at runtime, causing the status function to start breaking at unpredictable points:</p>
<pre><code>
status("connecting"); // Status: connecting Widget.prototype.info = "[[widget info]]";<br></br> status("connected");	// Status: [[widget info]]
</code></pre>
<p className="it">De forma similar, la función f anterior podría romperse si alguien agrega una propiedad x o y al objeto Math:</p>
<p className="p">Similarly, the function f above could be broken if someone adds an x or y property to the Math object:</p>
<pre><code>
Math.x = 0;<br></br>
Math.y = 0;<br></br>
f(2, 9); // 0
</code></pre>

<p className="it">Puede ser poco probable que alguien agregue propiedades xyy a Math. Pero no siempre es fácil predecir si un objeto concreto puede ser modificado, o puede tener propiedades que no conocía. Y como resulta, una característica que es impredecible para los seres humanos también puede ser impredecible para optimizar los compiladores. Normalmente, los scopes JavaScript pueden representarse con estructuras de datos internas eficientes y las búsquedas de variables pueden realizarse rápidamente. Pero debido a que un bloque con requiere buscar la cadena de prototipos de un objeto para todas las variables en su cuerpo, normalmente se ejecutará mucho más lentamente que un bloque ordinario.</p>
<p className="p">It might be unlikely that anyone would add x and y properties to Math. But it’s not always easy to predict whether a particular object might be modified, or might have properties you didn’t know about. And as it turns out, a feature that is unpredictable for humans can also be unpredictable for optimizing compilers. Normally, JavaScript scopes can be represented with efficient internal data structures  and variable lookups can be performed quickly. But because a with block requires searching an object’s prototype chain for all variables in its body, it will typically run much more slowly than an ordinary block.</p>
<p className="it">No hay una sola característica de JavaScript que reemplace directamente con como una mejor alternativa. En algunos casos, la mejor alternativa es simplemente enlazar un objeto a un nombre de variable corto:</p>
<p className="p">There is no single feature of JavaScript that directly replaces with as a better alternative. In some cases, the best alternative is simply to bind an object to a short variable name:</p>
<pre><code>
function status(info) &#123;<br></br>
var w = new Widget(); w.setBackground("blue"); w.setForeground("white"); w.addText("Status: " + info); w.show();<br></br>
&#125;
</code></pre>
<p className="it">El comportamiento de esta versión es mucho más predecible. Ninguna de las referencias de variable es sensible al contenido del objeto w. Así que incluso si algún código modifica el prototipo Widget, el estado continúa comportándose como se esperaba:</p>
<p className="p">The behavior of <code>this</code> version is much more predictable. None of the variable references are sensitive to the contents of the object w. So even if some code modifies the Widget prototype, status continues to behave as expected:</p>
<pre><code>
status("connecting"); // Status: connecting Widget.prototype.info = "[[widget info]]";<br></br> status("connected");	// Status: connected
</code></pre>
<p className="it">En otros casos, el mejor enfoque es vincular variables locales explícitamente a las propiedades relevantes:</p>
<p className="p">In other cases, the best approach is to bind local variables explicitly to the relevant properties:</p>
<pre><code>
function f(x, y) &#123;<br></br>
var min = Math.min, round = Math.round, sqrt = Math.sqrt;<br></br>
return min(round(x), sqrt(y));<br></br>
&#125;<br></br>
Again, once we eliminate with, the function’s behavior becomes predictable:<br></br>
Math.x = 0;<br></br>
Math.y = 0;<br></br>
f(2, 9); // 2
</code></pre>

<h3>Things to Remember</h3>
<p className="it">✦ Evite el uso de declaraciones.</p>
<p className="p">✦	Avoid using with statements.</p>
<p className="it">✦ Utilice nombres de variables cortas para el acceso repetido a un objeto.</p>
<p className="p">✦	Use short variable names for repeated access to an object.</p>
<p className="it">✦ Vincular explícitamente las variables locales a las propiedades del objeto en lugar de vincularlas implícitamente con una instrucción with.</p>
<p className="p">✦	Explicitly bind local variables to object properties instead of implicitly binding them with a with statement.</p>

<h3>Item 11: Get Comfortable with Closures</h3>
<p className="it">Los cierres pueden ser un concepto desconocido para los programadores procedentes de idiomas que no los soportan. Y pueden parecer intimidantes al principio. Pero tenga la seguridad de que hacer el esfuerzo de dominar los cierres se pagará por sí mismo muchas veces.</p>
<p className="p">Closures may be an unfamiliar concept to programmers coming from languages that don’t support them. And they may seem intimidating at first. But rest assured that making the effort to master closures will pay for itself many times over.</p>
<p className="it">Afortunadamente, no hay nada que temer. Entender cierres sólo requiere aprender tres hechos esenciales. El primer hecho es que JavaScript le permite referirse a variables que fueron definidas fuera de la función actual:</p>
<p className="p">Luckily, there’s really nothing to be afraid of. Understanding closures only requires learning three essential facts. The first fact is that JavaScript allows you to refer to variables that were defined outside of the current function:</p>
<pre><code>
function makeSandwich() &#123;<br></br>
var magicIngredient = "peanut butter";<br></br>
function make(filling) &#123;<br></br>
return magicIngredient + " and " + filling;<br></br>
&#125;<br></br>
return make("jelly");<br></br>
&#125;<br></br>
makeSandwich(); // "peanut butter and jelly"
</code></pre>
<p className="it">Observe cómo la función make interna se refiere a magicIngredient, una variable definida en la función makeSandwich externa.</p>
<p className="p">Notice how the inner make function refers to magicIngredient, a variable defined in the outer makeSandwich function.</p>
<p className="it">¡El segundo hecho es que las funciones pueden referirse a variables definidas en funciones externas incluso después de que esas funciones externas han vuelto! Si esto suena inverosímil, recuerde que las funciones JavaScript son objetos de primera clase (vea el ítem 19). Esto significa que puede devolver una función interna que se llamará en algún momento posterior:</p>
<p className="p">The second fact is that functions can refer to variables defined in outer functions even after those outer functions have returned! If that sounds implausible, remember that JavaScript functions are firstclass objects (see Item 19). That means that you can return an inner function to be called sometime later on:</p>
<pre><code>
function sandwichMaker() &#123;<br></br>
var magicIngredient = "peanut butter";<br></br>
function make(filling) &#123;<br></br>
return magicIngredient + " and " + filling;<br></br>
&#125;<br></br>
return make;<br></br>
&#125;<br></br>
var f = sandwichMaker();<br></br>
f("jelly");	// "peanut butter and jelly"<br></br>
<br></br>
<br></br>
f("bananas");	// "peanut butter and bananas"<br></br>
f("marshmallows"); // "peanut butter and marshmallows"
</code></pre>
<p className="it">Esto es casi idéntico al primer ejemplo, excepto que en lugar de llamar inmediatamente make ("jelly") dentro de la función externa, sandwichMaker devuelve la función make. Así que el valor de f es la función make interna, y llamando f efectivamente llamadas make. Pero de alguna manera, a pesar de que sandwichMaker ya volvió, hace que recuerde el valor de magicIngredient.</p>
<p className="p">This is almost identical to the first example, except that instead       of immediately calling make("jelly") inside the outer function, sandwichMaker returns the make function itself. So the value of f is the inner make function, and calling f effectively calls make. But somehow, even though sandwichMaker already returned, make remembers the value of magicIngredient.</p>
<p className="it">¿Como funciona esto? La respuesta es que los valores de función de JavaScript contienen más información que sólo el código necesario para ejecutar cuando se llaman. También almacenan internamente las variables a las que pueden referirse que se definen en sus scopes circulares. Las funciones que controlan las variables de sus scopes de contención se conocen como cierres. La función make es un cierre cuyo código se refiere a dos variables externas: magicIngredient y filling. Siempre que se llama a la función make, su código puede referirse a estas dos variables porque están almacenadas en el cierre.</p>
<p className="p">How does <code>this</code> work? The answer is that JavaScript function values contain more information than just the code required to execute when they’re called. They also internally store any variables they may refer to that are defined in their enclosing scopes. Functions that keep track of variables from their containing scopes are known as closures. The make function is a closure whose code refers to two outer variables: magicIngredient and filling. Whenever the make function is called, its code is able to refer to these two variables because they are stored in the closure.</p>
<p className="it">Una función puede referirse a cualquier variable en su scope, incluyendo los parámetros y variables de funciones externas. Podemos usar esto para hacer un sandwichMaker de uso más general:</p>
<p className="p">A function can refer to any variables in its scope, including the parameters and variables of outer functions. We can use <code>this</code> to make a more general-purpose sandwichMaker:</p>
<pre><code>
function sandwichMaker(magicIngredient) &#123;<br></br>
function make(filling) &#123;<br></br>
return magicIngredient + " and " + filling;<br></br>
&#125;<br></br>
return make;<br></br>
&#125;<br></br>
var hamAnd = sandwichMaker("ham"); hamAnd("cheese");	// "ham and cheese" hamAnd("mustard");	// "ham and mustard" <code>var</code> turkeyAnd = sandwichMaker("turkey"); turkeyAnd("Swiss");	// "turkey and Swiss"<br></br>
turkeyAnd("Provolone");	// "turkey and Provolone"</code></pre>
<p className="it">Este ejemplo crea dos funciones distintas, hamAnd y turkeyAnd. A pesar de que ambos vienen de la misma definición de hacer, son dos objetos distintos: La primera función almacena "jamón" como el valor de magicIngredient, y el segundo almacena "pavo".</p>
<p className="p">This example creates two distinct functions, hamAnd and turkeyAnd. Even though they both come from the same make definition, they are two distinct objects: The first function stores "ham" as the value of magicIngredient, and the second stores "turkey".</p>
<p className="it">Los cierres son una de las características más elegantes y expresivas de JavaScript, y están en el corazón de muchos idiomas útiles. JavaScript incluso proporciona una sintaxis literal más conveniente para construir cierres, la expresión de función:</p>
<p className="p">Closures are one of JavaScript’s most elegant and expressive features, and are at the heart of many useful idioms. JavaScript even provides a more convenient literal syntax for constructing closures, the function expression:</p>
<pre><code>
function sandwichMaker(magicIngredient) &#123;<br></br>
return function(filling) &#123;<br></br>
return magicIngredient + " and " + filling;<br></br>
&#125;;<br></br>
&#125;
</code></pre>
<p className="it">Observe que esta expresión de función es anónima: No es necesario nombrar la función ya que sólo la estamos evaluando para producir un nuevo valor de función, pero no tenemos intención de llamarla localmente. Las expresiones de función también pueden tener nombres (véase el punto 14).</p>
<p className="p">Notice that <code>this</code> function expression is anonymous: It’s not even necessary to name the function since we are only evaluating it to produce a new function value, but do not intend to call it locally. Function expressions can have names as well (see Item 14).</p>
<p className="it">El tercer y último hecho para aprender sobre los cierres es que pueden actualizar los valores de las variables externas. En realidad, los cierres almacenan referencias a sus variables externas, en lugar de copiar sus valores. Por lo tanto, las actualizaciones son visibles para cualquier cierre que tenga acceso a ellos. Un lenguaje simple que ilustra esto es un objeto de caja -a que almacena un valor interno que se puede leer y actualizar:</p>
<p className="p">The third and final fact to learn about closures is that they can update the values of outer variables. Closures actually store references to their outer variables, rather than copying their values. So updates are visible to any closures that have access to them. A simple idiom that illustrates <code>this</code> is a box—an object that stores an internal value that can be read and updated:</p>
<pre><code>
function box() &#123;<br></br>
var val = undefined;<br></br>
return &#123;<br></br>
set: function(newVal) &#123; val = newVal; &#125;, get: function() &#123; return val; &#125;,<br></br>
type: function() &#123; return typeof val; &#125;<br></br>
&#125;;<br></br>
&#125;<br></br>
var b = box();<br></br>
b.type(); // "undefined"<br></br>
b.set(98.6);<br></br>
b.get();	// 98.6<br></br>
b.type(); // "number"
</code></pre>
<p className="it">Este ejemplo produce un objeto que contiene tres cierres: sus propiedades set, get y type. Cada uno de estos cierres comparte el acceso a la variable val. El cierre de conjunto actualiza el valor de val y, posteriormente, llamando get y type ve los resultados de la actualización.</p>
<p className="p">This example produces an object containing three closures: its set, get, and type properties. Each of these closures shares access to the val variable. The set closure updates the value of val, and subsequently calling get and type sees the results of the update.</p>

<h3>Things to Remember</h3>
<p className="it">✦ Las funciones pueden referirse a variables definidas en scopes externos.</p>
<p className="p">✦	Functions can refer to variables defined in outer scopes.</p>
<p className="it">✦ Los cierres pueden sobrevivir a la función que los crea.</p>
<p className="p">✦	Closures can outlive the function that creates them.</p>
<p className="it">✦ Los cierres almacenan internamente referencias a sus variables externas, y pueden leer y actualizar sus variables almacenadas.</p>
<p className="p">✦	Closures internally store references to their outer variables, and can both read and update their stored variables.</p>
<h3>Item 12: Understand Variable Hoisting</h3>
<p className="it">JavaScript soporta el alcance léxico: Con algunas excepciones, una referencia a una variable foo está vinculada al scope más cercano en el que foo fue declarado. Sin embargo, JavaScript no es compatible con la definición de bloques: Las definiciones de variables no están delimitadas a su estado o bloque más cercano, sino más bien a su función contenedora.</p>
<p className="p">JavaScript supports lexical scoping: With only a few exceptions, a reference to a variable foo is bound to the nearest scope in which foo was declared. However, JavaScript does not support block scoping: Variable definitions are not scoped to their nearest enclosing statement or block, but rather to their containing function.</p>
<p className="it">No entender esta idiosincrasia de JavaScript puede conducir a errores como:</p>
<p className="p">Failing to understand <code>this</code> idiosyncrasy of JavaScript can lead to subtle bugs such as <code>this</code>:</p>
<pre><code>
function isWinner(player, others) &#123;<br></br>
var highest = 0;<br></br>
for (var i = 0, n = others.length; i &#60; n; i++) &#123;<br></br>
var player = others[i];<br></br>
if (player.score &#62; highest) &#123; highest = player.score;<br></br>
&#125;<br></br>
&#125;<br></br>
return player.score &#62; highest;<br></br>
&#125;
</code></pre>
<p className="it">Este programa parece declarar un reproductor variable local dentro del cuerpo de un bucle for. Sin embargo, debido a que las variables de JavaScript son de scope de función en vez de bloqueadas, la declaración interna del jugador simplemente redeclares una variable que ya estaba en el scope, es decir, el parámetro de jugador. Cada iteración del bucle entonces sobrescribe la misma variable. Como resultado, la instrucción de retorno ve al jugador como el último elemento de otros en lugar del argumento original del jugador de la función.</p>
<p className="p">This program appears to  declare  a  local  variable  player within  the body of a for loop. But because JavaScript variables are function-scoped rather than block-scoped, the inner declaration of player simply redeclares a variable that was already in scope—namely, the player parameter. Each iteration of the loop then overwrites the same variable. As a result, the return statement sees player as the last element of others instead of the function’s original player argument.</p>
<p className="it">Una buena manera de pensar sobre el comportamiento de las declaraciones variables de JavaScript es entenderlas como consistentes en dos partes: una declaración y una asignación. JavaScript implícitamente "levanta" la parte de la declaración en la parte superior de la función de inclusión y deja la asignación en su lugar. En otras palabras, la variable está en el scope de toda la función, pero sólo se asigna en el punto donde aparece la instrucción var. La Figura 2.2 proporciona una visualización del levantamiento.</p>
<p className="p">A good way to think about the behavior of JavaScript variable declarations is to understand them as consisting of two parts: a declaration and an assignment. JavaScript implicitly “hoists” the declaration part to the top of the enclosing function and leaves the assignment in place. In other words, the variable is in scope for the entire function, but it is only assigned at the point where the <code>var</code> statement appears. Figure 2.2 provides a visualization of hoisting.</p>
<p className="it">La elevación también puede conducir a la confusión sobre la redeclaración variable. Es legal declarar la misma variable varias veces dentro de la misma función. Esto suele aparecer cuando se escriben varios bucles:</p>
<p className="p">Hoisting can also lead to confusion about  variable redeclaration.  It is legal to declare the same variable multiple times within the same function. This often comes up when writing multiple loops:</p>
<pre><code>
function trimSections(header, body, footer) &#123;<br></br>
for (var i = 0, n = header.length; i &#60; n; i++) &#123; header[i] = header[i].trim();<br></br>
&#125;<br></br>
for (var i = 0, n = body.length; i &#60; n; i++) &#123; body[i] = body[i].trim();<br></br>
&#125;<br></br>
for (var i = 0, n = footer.length; i &#60; n; i++) &#123; footer[i] = footer[i].trim();<br></br>
&#125;<br></br>
&#125;
</code></pre>
<p className="it">La función trimSections aparece para declarar seis variables locales (tres llamadas i y tres llamadas n), pero la elevación resulta en sólo dos. En otras palabras, después de elevar, la función trimSections es equivalente a esta versión reescrita:</p>
<p className="p">The trimSections function appears to declare six local variables (three called i and three called n), but hoisting results in only two. In other words, after hoisting, the trimSections function is equivalent to <code>this</code> rewritten version:</p>
<pre><code>
function trimSections(header, body, footer) &#123;<br></br>
var i, n;<br></br>
for (i = 0, n = header.length; i &#60; n; i++) &#123; header[i] = header[i].trim();<br></br>
&#125;<br></br>
for (i = 0, n = body.length; i &#60; n; i++) &#123; body[i] = body[i].trim();<br></br>
&#125;<br></br>
for (i = 0, n = footer.length; i &#60; n; i++) &#123; footer[i] = footer[i].trim();<br></br>
&#125;<br></br>
&#125;
</code></pre>
<p className="it">Debido a que las redeclaraciones pueden conducir a la aparición de distintas variables, algunos programadores prefieren colocar todas las declaraciones <code>var</code> en la parte superior de sus funciones, elevando efectivamente sus variables manualmente, con el fin de evitar la ambigüedad. Independientemente de si prefiere este estilo, es importante entender las reglas de alcance de JavaScript, tanto para escribir como para leer código.</p>
<p className="p">Because redeclarations can lead to the appearance of distinct variables, some programmers prefer to place all <code>var</code> declarations at the top of their functions, effectively hoisting their variables manually, in order to avoid ambiguity. Regardless of whether you prefer <code>this</code> style, it’s important to understand the scoping rules of JavaScript, both for writing and reading code.</p>

<pre><code>
function f() &#123;<br></br>
// ...<br></br>
// ...<br></br>
&#123;<br></br>
// ...<br></br>
var x = / ...	/;<br></br>
// ...<br></br>
&#125;<br></br>
// ...<br></br>
&#125;
</code></pre>
<p className="fig">Figure 2.2 Variable hoisting</p>
<pre><code>
function f() &#123;<br></br>
var x;<br></br>
// ...<br></br>
&#123;<br></br>
// ...<br></br>
x = / ...	/;<br></br>
// ...<br></br>
&#125;<br></br>
// ...<br></br>
&#125;
</code></pre>

<p className="it">La única excepción a la falta de bloqueo de bloques de JavaScript es, con razón, excepciones. Es decir, try ... catch enlaza una excepción atrapada a una variable que está delimitada sólo al bloque catch:</p>
<p className="p">The one exception to JavaScript’s lack of block scoping is, appropriately enough, exceptions. That is, try…catch binds a caught exception to a variable that is scoped just to the catch block:</p>
<pre><code>
function test() &#123;<br></br>
var x = "var", result = []; result.push(x);<br></br>
try &#123;<br></br>
throw "exception";<br></br>
&#125; catch (x) &#123;<br></br>
x = "catch";<br></br>
&#125;<br></br>
result.push(x);<br></br>
return result;<br></br>
&#125;<br></br>
test(); // ["var", "var"]
</code></pre>
<h3>Things to Remember</h3>
<p className="it">✦ Las declaraciones de variables dentro de un bloque se suben implícitamente a la parte superior de su función de inclusión.</p>
<p className="p">✦	Variable declarations within a block are implicitly hoisted to the top of their enclosing function.</p>
<p className="it">✦ Las redeclaraciones de una variable se tratan como una sola variable.</p>
<p className="p">✦	Redeclarations of a variable are treated as a single variable.</p>
<p className="it">✦ Considere la posibilidad de levantar manualmente las declaraciones de variables locales para evitar confusiones.</p>
<p className="p">✦	Consider manually hoisting local variable declarations to avoid confusion.</p>

<h3>Item 13: Use Immediately Invoked Function Expressions to Create Local Scopes</h3>
<p className="it">¿Qué calcula este programa (buggy!)?</p>
<p className="p">What does <code>this</code> (buggy!) program compute?</p>
<pre><code>
function wrapElements(a) &#123;<br></br>
var result = [], i, n;<br></br>
for (i = 0, n = a.length; i &#60; n; i++) &#123; result[i] = function() &#123; return a[i]; &#125;;<br></br>
&#125;<br></br>
return result;<br></br>
&#125;<br></br>
<br></br>
var wrapped = wrapElements([10, 20, 30, 40, 50]);<br></br>
var f = wrapped[0]; f(); // ?<br></br>
</code></pre>
<p className="it">El programador puede haber previsto que produzca 10, pero en realidad produce el valor indefinido.</p>
<p className="p">The programmer may have intended for it to produce 10, but it actually produces the undefined value.</p>
<h3>Item 13:  Use IIFEs to Create Local Scopes	45</h3>
<p className="it">La manera de dar sentido a este ejemplo es entender la distinción entre vinculación y asignación. Al ingresar un scope en tiempo de ejecución se asigna una "ranura" en la memoria para cada vinculación de variables en ese scope. La función wrapElements vincula tres variables locales: result, i, y n. Así que cuando se llama, wrapElements asigna ranuras para estas tres variables. En cada iteración del bucle, el cuerpo del bucle asigna un cierre para la función anidada. El error en el programa proviene del hecho de que el programador aparentemente esperaba que la función almacenara el valor de i en el momento en que se creó la función anidada. Pero, de hecho, contiene una referencia a i. Puesto que el valor de i cambia después de cada función se crea, las funciones internas terminan viendo el valor final de i. Este es el punto clave sobre los cierres:</p>
<p className="p">The way to make sense of <code>this</code> example is to understand the distinction between binding and assignment. Entering a scope at runtime allocates a “slot” in memory for each variable binding in that scope. The wrapElements function binds three local variables: result, i, and n. So when it is called, wrapElements allocates slots for these three variables. On each iteration of the loop, the loop body allocates a closure for the nested function. The bug in the program comes from the fact that the programmer apparently expected the function to store the value of i at the time the nested function was created. But in fact, it contains a reference to i. Since the value of i changes after each function is created, the inner functions end up seeing the final value of i. This is the key point about closures:</p>
<p className="it">Los cierres almacenan sus variables externas por referencia, no por valor.</p>
<p className="p">Closures store their outer variables by reference, not by value.</p>
<p className="it">Así que todos los cierres creados por wrapElements se refieren a la única ranura compartida para i que se creó antes del bucle. Puesto que cada iteración de los incrementos de bucle i hasta que se ejecuta fuera del final de la matriz, en el momento en que realmente llamamos a uno de los cierres, busca índice 5 de la matriz y devuelve indefinido.</p>
<p className="p">So all the closures created by wrapElements refer to the single shared slot for i that was created before the loop. Since each iteration of the loop increments i until it runs off the end of the array, by the time we actually call one of the closures, it looks up index 5 of the array and returns undefined.</p>
<p className="it">Tenga en cuenta que wrapElements se comportaría exactamente igual, incluso si ponemos las declaraciones <code>var</code> en la cabeza del bucle for:</p>
<p className="p">Notice that wrapElements would behave exactly the same even if we put the <code>var</code> declarations in the head of the for loop:</p>
<pre><code>
function wrapElements(a) &#123;<br></br>
var result = [];<br></br>
for (var i = 0, n = a.length; i &#60; n; i++) &#123; result[i] = function() &#123; return a[i]; &#125;;<br></br>
&#125;<br></br>
return result;<br></br>
&#125;
<br></br>
var wrapped = wrapElements([10, 20, 30, 40, 50]);<br></br>
var f = wrapped[0]; f(); // undefined
</code></pre>
<p className="it">Esta versión se ve incluso un poco más engañosa, porque la declaración <code>var</code> parece estar dentro del bucle. Pero como siempre, las declaraciones variables se elevan a la parte superior del bucle. Así que una vez más, sólo hay una sola ranura asignada para la variable i.</p>
<p className="p">This version looks even a bit more deceptive, because the <code>var</code> declaration appears to be inside the loop. But as always, the variable declarations are hoisted to the top of the loop. So once again, there is only a single slot allocated for the variable i.</p>
<p className="it">La solución es forzar la creación de un scope local creando una función anidada y llamándola de inmediato:</p>
<p className="p">The solution is to force the creation of a local scope by creating a nested function and calling it right away:</p>
<pre><code>
function wrapElements(a) &#123;<br></br>
var result = [];<br></br>
for (var i = 0, n = a.length; i &#60; n; i++) &#123;<br></br>
<br></br>
<br></br>
(function() &#123;<br></br>
var j = i;<br></br>
result[i] = function() &#123; return a[j]; &#125;;<br></br>
&#125;)();<br></br>
&#125;<br></br>
return result;<br></br>
&#125;
</code></pre>
<p className="it">Esta técnica, conocida como la expresión de función inmediatamente invocada, o IIFE (pronunciada "iffy"), es una solución imprescindible para la falta de JavaScript de escopo de bloques. Una variación alternativa es vincular la variable local como un parámetro al IIFE y pasar su valor como argumento:</p>
<p className="p">This technique, known as the immediately invoked function expression, or IIFE (pronounced “iffy”), is an indispensable workaround for JavaScript’s lack of block scoping. An alternate variation is to bind the local variable as a parameter to the IIFE and pass its value as an argument:</p>
<pre><code>

function wrapElements(a) &#123;<br></br>
var result = [];<br></br>
for (var i = 0, n = a.length; i &#60; n; i++) &#123; (function(j) &#123;<br></br>
result[i] = function() &#123; return a[j]; &#125;;<br></br>
&#125;)(i);<br></br>
&#125;<br></br>
return result;<br></br>
&#125;
</code></pre>
<p className="it">Sin embargo, tenga cuidado al utilizar un IIFE para crear un scope local, ya que envolver un bloque en una función puede introducir algunos cambios sutiles en el bloque. En primer lugar, el bloque no puede contener ninguna ruptura o continuar las sentencias que saltan fuera del bloque, ya que es ilegal romper o continuar fuera de una función. En segundo lugar, si el bloque se refiere a esta o la variable argumentos especiales, el IIFE cambia su significado. El capítulo 3 discute técnicas para trabajar con esto y argumentos.</p>
<p className="p">However, be careful when using an IIFE to create a local scope, because wrapping a block in a function can introduce some subtle changes to the block. First of all, the block cannot contain any break or continue statements that jump outside of the block, since it is illegal to break or continue outside of a function. Second, if the block refers to <code>this</code> or the special arguments variable, the IIFE changes their meaning. Chapter 3 discusses techniques for working with <code>this</code> and arguments.</p>
<h3>Things to Remember</h3>
<p className="it">✦ Comprender la diferencia entre la vinculación y la asignación.</p>
<p className="p">✦	Understand the difference between binding and assignment.</p>
<p className="it">✦ Los cierres capturan sus variables externas por referencia, no por valor.</p>
<p className="p">✦	Closures capture their outer variables by reference, not by value.</p>
<p className="it">✦ Utilice expresiones de función inmediatamente invocadas (IIFEs) para crear scopes locales.</p>
<p className="p">✦	Use immediately invoked function expressions (IIFEs) to create local scopes.</p>
<p className="it">✦ Sea consciente de los casos en los que el envoltorio de un bloque en un IIFE puede cambiar su comportamiento.</p>
<p className="p">✦	Be aware of the cases where wrapping a block in an IIFE can change its behavior.</p>
<h3>Item 14: Beware of Unportable Scoping of Named Function Expressions</h3>
<p className="it">Las funciones JavaScript pueden tener el mismo aspecto donde quiera que vayan, pero su significado cambia dependiendo del contexto. Tome un fragmento de código como el siguiente:</p>
<p className="p">JavaScript functions may look the same wherever they go, but their meaning changes depending on the context. Take a code snippet such as the following:</p>
<pre><code>
function double(x) &#123; return x	2; &#125;
</code></pre>
<p className="it">Dependiendo de donde aparezca, esto podría ser una declaración de función o una expresión de función nombrada. Una declaración es familiar: Define una función y la vincula a una variable en el scope actual. En el nivel superior de un programa, por ejemplo, la declaración anterior crearía una función global denominada doble. Pero el mismo código de función puede ser usado como una expresión, donde tiene un significado muy diferente. Por ejemplo:</p>
<p className="p">Depending on where it appears, <code>this</code> could be either a function declaration or a named function expression. A declaration is familiar: It defines a function and binds it to a variable in the current scope. At the top level of a program, for example, the above declaration would create a global function called double. But the same function code can be used as an expression, where it has a very different meaning. For example:</p>
<pre><code>
var f = function double(x) &#123; return x	2; &#125;;
</code></pre>
<p className="it">De acuerdo con la especificación ECMAScript, esto enlaza la función a una variable f en vez de doble. Por supuesto, no tenemos que dar un nombre a una expresión de función. Podríamos usar el formulario de expresión de función anónima:</p>
<p className="p">According to the ECMAScript specification, <code>this</code> binds the function   to a variable f rather than double. Of course, we don’t have to give a function expression a name. We could use the anonymous function expression form:</p>
<pre><code>
var f = function(x) &#123; return x	2; &#125;;
</code></pre>
<p className="it">La diferencia oficial entre las expresiones de función anónimas y denominadas es que el último vincula su nombre como una variable local dentro de la función. Esto se puede utilizar para escribir expresiones de funciones recursivas:</p>
<p className="p">The official difference between anonymous and named function expressions is that the latter binds its name as a local variable within the function. This can be used to write recursive function expressions:</p>
<pre><code>
var f = function find(tree, key) &#123;<br></br>
if (!tree) &#123;<br></br>
return null;<br></br>
&#125;<br></br>
if (tree.key === key) &#123;<br></br>
return tree.value;<br></br>
&#125;<br></br>
return find(tree.left, key) || find(tree.right, key);<br></br>
&#125;;<br></br>
</code></pre>
<p className="it">Tenga en cuenta que find es sólo en el scope dentro de la propia función. A diferencia de una declaración de función, una expresión de función nombrada no puede ser referida externamente por su nombre interno:</p>
<p className="p">Note that find is only in scope within the function itself. Unlike a function declaration, a named function expression can’t be referred to externally by its internal name:</p>
<pre><code>

<p className="it">find(myTree, "foo"); // error: find is not defined</p>
<p className="p">find(myTree, "foo"); // error: find is not defined</p>
</code></pre>

<p className="it">El uso de expresiones de función nombradas para la recursión puede no parecer particularmente útil, ya que está bien usar el nombre del scope externo para la función:</p>
<p className="p">Using named function expressions for recursion may not seem particularly useful, since it’s fine to use the outer scope’s name for the function:</p>
<pre><code>
var f = function(tree, key) &#123;<br></br>
if (!tree) &#123;<br></br>
return null;<br></br>
&#125;<br></br>
if (tree.key === key) &#123;<br></br>
return tree.value;<br></br>
&#125;<br></br>
return f(tree.left, key) || f(tree.right, key);<br></br>
&#125;;<br></br>
Or we could just use a declaration:<br></br>
function find(tree, key) &#123;<br></br>
if (!tree) &#123;<br></br>
return null;<br></br>
&#125;<br></br>
if (tree.key === key) &#123;<br></br>
return tree.value;<br></br>
&#125;<br></br>
return find(tree.left, key) || find(tree.right, key);<br></br>
&#125;<br></br>
var f = find;
</code></pre>
<p className="it">La utilidad real de las expresiones de función nombradas, sin embargo, es para la depuración. La mayoría de los entornos de JavaScript modernos producen trazas de pila para objetos Error, y el nombre de una expresión de función se utiliza típicamente para su entrada en un seguimiento de pila. Los depuradores con facilidades para inspeccionar la pila suelen hacer uso similar de las expresiones de función nombradas.</p>
<p className="p">The real usefulness of named function expressions, though, is for debugging. Most modern JavaScript environments produce stack traces for Error objects, and the name of a function expression is typically used for its entry in a stack trace. Debuggers with facilities for inspecting the stack typically make similar use of named function expressions.</p>
<p className="it">Lamentablemente, las expresiones de función nombradas han sido una fuente notoria de problemas de alcance y compatibilidad, debido a una combinación de un error desafortunado en la historia de la especificación ECMAScript y los errores en los motores JavaScript populares. El error de la especificación, que existía a través de ES3, era que los motores del Javascript se requerían para representar el alcance de una expresión nombrada de la función como objeto, al igual que la problemática con la construcción. Si bien este objeto de scope sólo contiene una única propiedad que vincula el nombre de la función a la función, también hereda las propiedades de Object.prototype. Esto significa que sólo nombrar una expresión de función también trae todas las propiedades de <code>Object.prototype</code> en el scope. Los resultados pueden ser sorprendentes:</p>
<p className="p">Sadly, named function expressions have been a notorious source of scoping and compatibility issues, due to a combination of an unfortunate mistake in the history of the ECMAScript specification and bugs in popular JavaScript engines. The specification mistake, which existed through ES3, was that JavaScript engines were required to represent the scope of a named function expression as an object, much like the problematic with construct. While <code>this</code> scope object only contains a single property binding the function’s name to the function, it also inherits properties from Object.prototype. This means that just naming a function expression also brings all of the properties of <code>Object.prototype</code> into scope. The results can be surprising:</p>

<pre><code>
var constructor = function() &#123; return null; &#125;;<br></br>
var f = function f() &#123;<br></br>
return constructor();<br></br>
&#125;;<br></br>
f(); // &#123;&#125; (in ES3 environments)
</code></pre>
<p className="it">Este programa parece que debería producir nulo, pero en realidad se produce un nuevo objeto, porque la expresión función llamada hereda Object.prototype.constructor (es decir, la función constructora de objetos) en su alcance. Y al igual que con, el scope se ve afectado por cambios dinámicos en Object.prototype. Una parte de un programa podría agregar o eliminar propiedades a <code>Object.prototype</code> y las variables dentro de las expresiones de función con nombre en todas partes se verían afectadas.</p>
<p className="p">This program looks like it should produce null, but it actually produces a new object, because the named function expression inherits Object.prototype.constructor (i.e., the Object constructor function) in its scope. And just like with, the scope is affected by dynamic changes to Object.prototype. One part of a program could add or delete properties to <code>Object.prototype</code> and variables within named function expressions everywhere would be affected.</p>
<p className="it">Afortunadamente, ES5 corrigió este error. Sin embargo, algunos ambientes JavaScript continúan utilizando el escopo de objetos obsoletos. Peor aún, algunos son aún menos compatibles con los estándares y usan objetos como scopes incluso para expresiones de función anónimas. Entonces, incluso eliminar el nombre de la expresión de la función en el ejemplo anterior produce un objeto en lugar del esperado null:</p>
<p className="p">Thankfully, ES5 corrected <code>this</code> mistake. But some JavaScript environments continue to use the obsolete object scoping. Worse, some are even less standards-compliant and use objects as scopes even   for anonymous function expressions! Then, even removing the function expression’s name in the preceding example produces an object instead of the expected null:</p>
<pre><code>
var constructor = function() &#123; return null; &#125;;<br></br>
var f = function() &#123;<br></br>
return constructor();<br></br>
&#125;;<br></br>
f(); // &#123;&#125; (in nonconformant environments)
</code></pre>
<p className="it">La mejor manera de evitar estos problemas en sistemas que contaminan los scopes de sus expresiones de función con objetos es evitar agregar nuevas propiedades a <code>Object.prototype</code> y evitar el uso de variables locales con cualquiera de los nombres de las propiedades estándar Object.prototype.</p>
<p className="p">The best way to avoid these problems on systems that pollute their function expressions’ scopes with objects is to avoid ever adding new properties to <code>Object.prototype</code> and avoid using local variables with any of the names of the standard <code>Object.prototype</code> properties.</p>
<p className="it">El siguiente error que se observa en los motores de JavaScript populares es elevar las expresiones de función nombradas como si fueran declaraciones. Por ejemplo:</p>
<p className="p">The next bug seen in popular JavaScript engines is hoisting named function expressions as if they were declarations. For example:</p>
<pre><code>
var f = function g() &#123; return 17; &#125;;<br></br>
g(); // 17 (in nonconformant environments)
</code></pre>
<p className="it">Para ser claro, no se trata de un comportamiento conforme a los estándares. Peor aún, algunos entornos de JavaScript incluso tratan las dos funciones fyg como objetos distintos, lo que lleva a una asignación de memoria innecesaria. Una solución razonable para este comportamiento es crear una variable local del mismo nombre que la expresión de función y asignarla a null:</p>
<p className="p">To be clear, <code>this</code> is not standards-compliant behavior. Worse, some JavaScript environments even treat the two functions f and g as distinct objects, leading to unnecessary memory allocation! A reasonable workaround for <code>this</code> behavior is to create a local variable of the same name as the function expression and assign it to null:</p>
<pre><code>
var f = function g() &#123; return 17; &#125;;<br></br>
var g = null;
</code></pre>
<p className="it">Redeclar la variable con <code>var</code> asegura que g está obligado incluso en aquellos entornos que no erróneamente elevan la expresión de la función y establecerla en null asegura que la función duplicada puede ser recolectada.</p>
<p className="p">Redeclaring the variable with <code>var</code> ensures that g is bound even in those environments that do not erroneously hoist the function expression, and setting it to null ensures that the duplicate function can be garbage-collected.</p>
<p className="it">Sería ciertamente razonable concluir que las expresiones de función nombradas son demasiado problemáticas para valer la pena usarlas. Una respuesta menos austera sería usar expresiones de función nombradas durante el desarrollo para depurar y ejecutar código a través de un preprocesador para anonimizar todas las expresiones de función antes de enviarlas. Pero una cosa es cierta: siempre debes estar claro acerca de qué plataformas estás enviando (ver ítem 1). Lo peor que puedes hacer es desechar tu código con soluciones que ni siquiera son necesarias para las plataformas que soportas.</p>
<p className="p">It would certainly be reasonable to conclude that named function expressions are just too problematic to be worth using. A less austere response would be to use named function expressions during development for debugging, and to run code through a preprocessor to anonymize all function expressions before shipping. But one thing is certain: You should always be clear about what platforms you are shipping on (see Item 1). The worst thing you could do is to litter your code with workarounds that aren’t even necessary for the platforms you support.</p>

<h3>Things to Remember</h3>
<p className="it">✦ Usar expresiones de función con nombre para mejorar los rastreos de pila en Error</p>
<p className="p">✦	Use named function expressions to improve stack traces in Error</p>
<p className="it">Objetos y depuradores.</p>
<p className="p">objects and debuggers.</p>
<p className="it">✦ Cuidado con la contaminación del scope de expresión de la función con Object</p>
<p className="p">✦	Beware of pollution of function expression scope with Object</p>
<p className="it">.prototype en ES3 y entornos de buggy JavaScript.</p>
<p className="p">.prototype in ES3 and buggy JavaScript environments.</p>
<p className="it">✦ Tenga cuidado con el levantamiento y la asignación duplicada de expresiones de función con nombre en entornos de JavaScript con errores.</p>
<p className="p">✦	Beware of hoisting and duplicate allocation of named function expressions in buggy JavaScript environments.</p>
<p className="it">✦ Considere la posibilidad de evitar expresiones de función nombradas o de eliminarlas antes de enviarlas.</p>
<p className="p">✦	Consider avoiding named function expressions or removing them before shipping.</p>
<p className="it">✦ Si está enviando en entornos ES5 correctamente implementados, no tiene nada de qué preocuparse.</p>
<p className="p">✦	If you are shipping in properly implemented ES5 environments, you’ve got nothing to worry about.</p>

<h3>Item 15: Beware of Unportable Scoping of Block-Local Function Declarations</h3>
<p className="it">La saga de la sensibilidad al contexto continúa con las declaraciones de funciones anidadas. Puede sorprenderle saber que no existe una forma estándar de declarar funciones dentro de un bloque local. Ahora, es perfectamente legal y habitual anidar una declaración de función en la parte superior de otra función:</p>
<p className="p">The saga of context sensitivity continues with nested function declarations. It may surprise you to know that there is no standard way to declare functions inside a local block. Now, it’s perfectly legal and customary to nest a function declaration at the top of another function:</p>
<pre><code>
function f() &#123; return "global"; &#125;<br></br>
<br></br>
function test(x) &#123;<br></br>
function f() &#123; return "local"; &#125;<br></br>
<br></br>
var result = [];<br></br>
if (x) &#123;<br></br>
result.push(f());<br></br>
&#125;
</code></pre>
<h3>Item 15: Beware of Unportable Scoping of Block-Local Function Declarations 51</h3>
<pre><code>
result.push(f());<br></br>
return result;<br></br>
&#125;<br></br>
<br></br>
test(true);	// ["local", "local"]<br></br>
test(false); // ["local"]<br></br>
</code></pre>
<p className="it">Pero es una historia completamente diferente si nos movemos f en un bloque local:</p>
<p className="p">But it’s an entirely different story if we move f into a local block:</p>
<pre><code>
function f() &#123; return "global"; &#125;<br></br>
<br></br>
function test(x) &#123; <code>var</code> result = []; if (x) &#123;<br></br>
function f() &#123; return "local"; &#125; // block-local<br></br>
<br></br>
result.push(f());<br></br>
&#125;<br></br>
result.push(f());<br></br>
return result;<br></br>
&#125;<br></br>
<br></br>
test(true);	// ?<br></br>
test(false); // ?
</code></pre>
<p className="it">Puede esperar que la primera llamada pruebe para producir la matriz ["local", "global"] y la segunda para producir ["global"], ya que el f interno parece ser local al bloque if. Pero recuerde que JavaScript no es de scope de bloque, por lo que el interior f debe ser en el scope de todo el cuerpo de la prueba. Una segunda suposición razonable sería ["local", "local"] y ["local"]. Y de hecho, algunos ambientes JavaScript se comportan de esta manera. ¡Pero no todos! Otros condicionalmente vinculan el f interno en tiempo de ejecución, sobre la base de si su bloque que lo rodea se ejecuta. (Esto no sólo hace que el código sea más difícil de entender, sino que también conduce a un rendimiento lento, no a diferencia de las declaraciones.)</p>
<p className="p">You might expect the first call to test to  produce  the  array  ["local", "global"] and the second to produce ["global"], since the inner f appears to be local to the if block. But recall that JavaScript is not block-scoped, so the inner f should be in scope for the whole body of test. A reasonable second guess would be ["local", "local"] and ["local"]. And in fact, some JavaScript environments behave <code>this</code> way. But not all of them! Others conditionally bind the inner f at runtime, based on whether its enclosing block is executed. (Not only does <code>this</code> make code harder to understand, but it also leads to slow performance, not unlike with statements.)</p>
<p className="it">¿Qué tiene que decir el estándar ECMAScript sobre este estado de cosas? Sorprendentemente, casi nada. Hasta ES5, la norma ni siquiera reconocía la existencia de las declaraciones de función de bloque local; Las declaraciones de función se especifican oficialmente para que aparezcan únicamente en el nivel más externo de otras funciones o de un programa. ES5 incluso recomienda convertir declaraciones de funciones en contextos no estándar en una advertencia o error, y las implementaciones de JavaScript populares las reportan como un error en modo estricto: un programa en modo estricto con una declaración de función local bloqueará un error de sintaxis. Esto ayuda a detectar el código no portátil y elimina un camino para futuras versiones del estándar para especificar una semántica más sensible y portátil para las declaraciones locales bloqueadas.</p>
<p className="p">What does the ECMAScript standard have to say about <code>this</code> state of affairs? Surprisingly, almost nothing. Until ES5, the standard did  not even acknowledge the existence of block-local function declarations; function declarations are  officially  specified  to  appear  only at the outermost level of other functions or of a program. ES5 even recommends turning function declarations in nonstandard contexts into a warning or error, and popular JavaScript implementations report them as an error in strict mode—a strict-mode program with a block-local function declaration will report a syntax error. This helps detect unportable code, and it clears a path for future versions of the standard to specify more sensible and portable semantics for blocklocal declarations.</p>
<p className="it">Mientras tanto, la mejor manera de escribir funciones portátiles es evitar poner declaraciones de función en bloques locales o en subsiguientes. Si desea escribir una declaración de función anidada, colóquela en el nivel más externo de su función principal, como se muestra en la versión original del código. Si, por otro lado, necesita elegir entre funciones condicionalmente, la mejor manera de hacerlo es con declaraciones <code>var</code> y expresiones de función:</p>
<p className="p">In the meantime, the best way to write portable functions is to avoid ever putting function declarations in local blocks or substatements.  If you want to write a nested function declaration, put it at the outermost level of its parent function, as shown in the original version of the code. If, on the other hand, you need to choose between functions conditionally, the best way to do <code>this</code> is with <code>var</code> declarations and function expressions:</p>
<pre><code>
function f() &#123; return "global"; &#125;<br></br>
<br></br>
function test(x) &#123;<br></br>
var g = f, result = [];<br></br>
if (x) &#123;<br></br>
g = function() &#123; return "local"; &#125;<br></br>
<br></br>
result.push(g());<br></br>
&#125;<br></br>
result.push(g());<br></br>
return result;<br></br>
&#125;
</code></pre>
<p className="it">Esto elimina el misterio del escopo de la variable interna (denominado aquí a g): Está incondicionalmente ligado como una variable local, y sólo la asignación es condicional. El resultado es inequívoco y totalmente portátil.</p>
<p className="p">This eliminates the mystery of the scoping of the inner variable (renamed here to g): It is unconditionally bound as a local variable, and only the assignment is conditional. The result is unambiguous and fully portable.</p>

<p className="it"></p>
<p className="p"><h3>Things to Remember</h3></p>
<p className="it">✦ Mantenga siempre las declaraciones de funciones en el nivel más externo de un programa o una función contenedora para evitar comportamientos no portátiles.</p>
<p className="p">✦	Always keep function declarations at the outermost level of a program or a containing function to avoid unportable behavior.</p>
<p className="it">✦ Utilizar declaraciones <code>var</code> con asignación condicional en lugar de declaraciones condicionales de función.</p>
<p className="p">✦	Use <code>var</code> declarations with conditional assignment instead of conditional function declarations.</p>

<h3>Item 16: Avoid Creating Local Variables with eval</h3>
<p className="it">La función eval de JavaScript es una herramienta increíblemente potente y flexible. Herramientas de gran alcance son fáciles de abusar, por lo que vale la pena entender. Una de las maneras más simples de ejecutar afoul de eval es permitir que interfiera con el scope.</p>
<p className="p">JavaScript’s eval function is an incredibly powerful and flexible tool. Powerful tools are easy to abuse, so they’re worth understanding. One of the simplest ways to run afoul of eval is to allow it to interfere with scope.</p>
<p className="it">Llamar eval interpreta su argumento como un programa JavaScript, pero ese programa se ejecuta en el scope local de la persona que llama. Las variables globales del programa incrustado se crean como locales del programa llamante:</p>
<p className="p">Calling eval interprets its argument as a JavaScript program, but that program runs in the local scope of the caller. The global variables of the embedded program get created as locals of the calling program:</p>
<pre><code>
function test(x) &#123;<br></br>
eval("var y = x;"); // dynamic binding<br></br>
return y;<br></br>
&#125;<br></br>
test("hello"); // "hello"
</code></pre>
<p className="it">Este ejemplo se ve claro, pero se comporta sutilmente diferente a lo que se comportaría la declaración <code>var</code> si estuviera directamente incluida en el cuerpo de prueba. La declaración <code>var</code> sólo se ejecuta cuando se llama a la función eval. Colocar un eval en un contexto condicional trae sus variables en el scope sólo si el condicional es ejecutado:</p>
<p className="p">This example looks clear, but it behaves subtly differently than the <code>var</code> declaration would behave if it were directly included in the body of test. The <code>var</code> declaration is only executed when the eval function is called. Placing an eval in a conditional context brings its variables into scope only if the conditional is executed:</p>
<pre><code>
var y = "global";<br></br>
function test(x) &#123;<br></br>
if (x) &#123;<br></br>
eval("var y = 'local';"); // dynamic binding<br></br>
&#125;<br></br>
return y;<br></br>
&#125;<br></br>
test(true);	// "local"<br></br>
test(false); // "global"
</code></pre>
<p className="it">Basar las decisiones de alcance en el comportamiento dinámico de un programa es casi siempre una mala idea. El resultado es que simplemente entender a qué vinculante se refiere una variable requiere seguir los detalles de cómo se ejecuta el programa. Esto es especialmente difícil cuando el código fuente pasado a eval ni siquiera se define localmente:</p>
<p className="p">Basing scoping decisions on the dynamic behavior of a program is almost always a bad idea. The result is that simply understanding which binding a variable refers to requires following the details of how the program executes. This is especially tricky when the source code passed to eval is not even defined locally:</p>
<pre><code>
var y = "global";<br></br>
function test(src) &#123;<br></br>
eval(src); // may dynamically bind<br></br>
return y;<br></br>
&#125;<br></br>
test("var y = 'local';"); // "local"<br></br>
test("var z = 'local';"); // "global"<br></br>
</code></pre>
<p className="it">Este código es quebradizo e inseguro: Da a los llamadores externos la capacidad de cambiar el alcance interno de la función de prueba. Esperar que eval modifique su scope contenedor tampoco es seguro para la compatibilidad con el modo estricto ES5, que ejecuta eval en un scope anidado para evitar este tipo de contaminación. Una forma sencilla de garantizar que eval no afecte a los scopes externos es ejecutarlo en un scope anidado de forma explícita:</p>
<p className="p">This code is brittle and unsafe: It gives external callers the power to change the internal scoping of the test function. Expecting eval to modify its containing scope is also not safe for compatibility with ES5 strict mode, which runs eval in a nested scope to prevent <code>this</code> kind of pollution. A simple way to ensure that eval does not affect outer scopes is to run it in an explicitly nested scope:</p>
<pre><code>
var y = "global";<br></br>
function test(src) &#123;<br></br>
(function() &#123; eval(src); &#125;)();<br></br>
return y;<br></br>
&#125;<br></br>
 <br></br>
<br></br>
test("var y = 'local';"); // "global"<br></br>
test("var z = 'local';"); // "global"
</code></pre>
<p className="it"></p>
<p className="p"><h3>Things to Remember</h3></p>
<p className="it">✦ Evite crear variables con eval que contaminen el alcance de la persona que llama.</p>
<p className="p">✦	Avoid creating variables with eval that pollute the caller’s scope.</p>
<p className="it">✦ Si el código eval puede crear variables globales, envuelva la llamada en una función anidada para evitar la contaminación del alcance.</p>
<p className="p">✦	If eval code might create global variables, wrap the call in a nested function to prevent scope pollution.</p>

<h3>Item 17: Prefer Indirect eval to Direct eval</h3>
<p className="it">La función eval tiene un arma secreta: Es más que una función.</p>
<p className="p">The eval function has a secret weapon: It’s more than just a function.</p>
<p className="it">La mayoría de las funciones tienen acceso al scope en el que se definen, y nada más. Pero eval tiene acceso al scope completo en el punto donde se llama. Este es un poder inmenso que cuando los autores de compiladores intentaron por primera vez optimizar JavaScript, descubrieron que eval dificultaba hacer cualquier llamada de función eficiente, ya que cada llamada de función necesaria para hacer su alcance disponible en tiempo de ejecución en caso de que la función resultó ser eval .</p>
<p className="p">Most functions have access to the scope where they are defined, and nothing else. But eval has access to the full scope at the point where it’s called. This is such immense power that when compiler writers first tried to optimize JavaScript, they discovered that eval made it difficult to make any function calls efficient, since every function call needed to make its scope available at runtime in case the function turned out to be eval.</p>
<p className="it">Como compromiso, el estándar de lenguaje evolucionó para distinguir dos formas diferentes de llamar eval. Una llamada de función que implica el eval del identificador se considera una llamada "directa" a eval:</p>
<p className="p">As a compromise, the language standard evolved to distinguish two different ways of calling eval. A function call involving the identifier eval is considered a “direct” call to eval:</p>
<pre><code>
var x = "global";<br></br>
function test() &#123;<br></br>
var x = "local";<br></br>
return eval("x"); // direct eval<br></br>
&#125;<br></br>
test(); // "local"
</code></pre>
<p className="it">En este caso, los compiladores deben asegurarse de que el programa ejecutado tenga acceso completo al scope local de la persona que llama. El otro tipo de llamada a eval se considera "indirecto" y evalúa su argumento en el scope global. Por ejemplo, vincular la función eval a un nombre de variable diferente y llamarlo a través del nombre alternativo hace que el código pierda el acceso a cualquier scope local:</p>
<p className="p">In <code>this</code> case, compilers are required to ensure that the executed program has complete access to the local scope of the caller. The other kind of call to eval is considered “indirect,” and evaluates its argument in global scope. For example, binding the eval function to a different variable name and calling it through the alternate name causes the code to lose access to any local scope:</p>
<pre><code>
var x = "global";<br></br>
function test() &#123; <code>var</code> x = "local"; <code>var</code> f = eval;<br></br>
return f("x"); // indirect eval<br></br>
&#125;<br></br>
test(); // "global"
</code></pre>

<p className="it">La definición exacta de eval directo depende del lenguaje de especificación bastante idiosincrático del estándar ECMAScript. En la práctica, la única sintaxis que puede producir un eval directo es una variable con el nombre eval, posiblemente rodeado por (cualquier número de) paréntesis. Una manera concisa de escribir una llamada indirecta a eval es usar el operador de secuenciación de expresiones (,) con un literal de número aparentemente sin sentido:</p>
<p className="p">The exact definition of direct eval depends on the rather idiosyncratic specification language of the ECMAScript standard. In practice, the only syntax that can produce a direct eval is a variable with the name eval, possibly surrounded by (any number of) parentheses. A concise way to write an indirect call to eval is to use the expression sequencing operator (,) with an apparently pointless number literal:</p>
<pre><code>
(0,eval)(src);
</code></pre>
<p className="it">¿Cómo funciona esta peculiar función de función llamada? Se evalúa el número 0, pero su valor se ignora, y la expresión de la secuencia entre paréntesis produce la función eval. So (0, eval) se comporta casi exactamente igual que el eval de identificador simple, con la diferencia importante de que toda la expresión de llamada se trata como un eval indirecto.</p>
<p className="p">How does <code>this</code> peculiar-looking function call work? The number literal 0 is evaluated but its value is ignored, and the parenthesized sequence expression produces the eval function. So (0,eval) behaves almost exactly the same as the plain identifier eval, with the one important difference being that the whole call expression is treated as an indirect eval.</p>
<p className="it">El poder del eval directo puede ser fácilmente abusado. Por ejemplo, la evaluación de una cadena de origen procedente de la red puede exponer los internales a partes no fiables. En el punto 16 se habla de los peligros de evaluar dinámicamente variables locales; Estos peligros sólo son posibles con una evaluación directa. Además, el costo directo de los costos es muy alto en el desempeño. En general, debe suponer que eval directa hace que su función que contiene y todas las funciones que contienen hasta el nivel más externo del programa a ser considerablemente más lento.</p>
<p className="p">The power of direct eval can be easily abused. For example, evaluating a source string coming from over the network can expose internals to untrusted parties. Item 16 talks about the dangers of eval dynamically creating local variables; these dangers are only possible with direct eval. Moreover, direct eval costs dearly in performance.  In general, you should assume that direct eval causes its containing function and all containing functions up to the outermost level of the program to be considerably slower.</p>
<p className="it">Hay ocasionalmente razones para usar el eval directo. Pero a menos que haya una necesidad clara de la capacidad extra de inspeccionar el scope local, utilice el eval indirecto menos abusado y menos costoso.</p>
<p className="p">There are occasionally reasons to use direct eval. But unless there’s  a clear need for the extra power of inspecting local scope, use the less easily abused and less expensive indirect eval.</p>

<h3>Things to Remember</h3>
<p className="it">✦ Envuelva eval en una expresión de secuencia con un literal inútil para forzar el uso de eval indirecto.</p>
<p className="p">✦	Wrap eval in a sequence expression with a useless literal to force the use of indirect eval.</p>
<p className="it">✦ Preferir el eval indirecto para dirigir eval siempre que sea posible.</p>
<p className="p">✦	Prefer indirect eval to direct eval whenever possible.</p>
</div>
</div>
  </Layout>
)
