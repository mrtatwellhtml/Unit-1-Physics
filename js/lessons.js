/* Teaching content: notation guide, lessons V1–V16, formula sheet, checklist. */

const NOTATION_HTML = String.raw`
<p>Vectors have their own "spelling". Examiners expect you to <strong>read</strong> it correctly in questions and to <strong>write</strong> it correctly in your answers — a vector written without its arrow or underline is, strictly, just a number. Work through this page first, then take the notation quiz at the bottom.</p>

<h2>1. Naming a vector</h2>
<div class="table-wrap"><table>
<tr><th>You see (print)</th><th>Say it as</th><th>What it means</th><th>How <em>you</em> write it by hand</th></tr>
<tr><td>\(\mathbf{a}\) (bold) or \(\vec{a}\)</td><td>"vector a"</td><td>A quantity with magnitude <em>and</em> direction, called a.</td><td>\(\vec{a}\) or \(\underline{a}\). You cannot write bold by hand, so you <strong>must</strong> add the arrow or underline.</td></tr>
<tr><td>\(a\) (plain italic)</td><td>"a"</td><td>Usually the <em>magnitude</em> of \(\vec{a}\) — just a number (with units).</td><td>\(a\)</td></tr>
<tr><td>\(\overrightarrow{AB}\)</td><td>"vector A B"</td><td>The displacement <em>from</em> point \(A\) <em>to</em> point \(B\). Order matters.</td><td>\(\overrightarrow{AB}\) — arrow over both letters, pointing right.</td></tr>
<tr><td>\(\overrightarrow{BA}\)</td><td>"vector B A"</td><td>From \(B\) to \(A\): \(\overrightarrow{BA} = -\overrightarrow{AB}\).</td><td>\(\overrightarrow{BA}\)</td></tr>
<tr><td>\(\vec{0}\)</td><td>"the zero vector"</td><td>Magnitude zero, no direction. The resultant of forces in equilibrium.</td><td>\(\vec{0}\) or \(\underline{0}\)</td></tr>
</table></div>

<h2>2. Size (magnitude) of a vector</h2>
<div class="table-wrap"><table>
<tr><th>Notation</th><th>Say it as</th><th>Meaning</th></tr>
<tr><td>\(|\vec{a}|\) or \(a\)</td><td>"modulus of a" / "magnitude of a"</td><td>The length or size of \(\vec{a}\). Always \(\ge 0\). It is a <strong>scalar</strong>.</td></tr>
<tr><td>\(|\overrightarrow{AB}|\) or \(AB\)</td><td>"the length AB"</td><td>The distance between \(A\) and \(B\).</td></tr>
<tr><td>\(|-\vec{a}| = |\vec{a}|\)</td><td></td><td>Reversing a vector does not change its size.</td></tr>
</table></div>
<div class="box trap"><h4>Examiner's trap</h4><p>A magnitude is <strong>never negative</strong>, but a <em>component</em> can be. \(|\vec{a}| = -5\) is always wrong; \(a_x = -5\) is fine (it means 5 units in the \(-x\) direction).</p></div>

<h2>3. Components and column vectors</h2>
<p>At CAPE level you describe a vector in one of two ways: by its <strong>magnitude and direction</strong> ("12 N at 30° above the horizontal"), or by its <strong>components</strong> along two perpendicular axes.</p>
<div class="table-wrap"><table>
<tr><th>Notation</th><th>Say it as</th><th>Meaning</th></tr>
<tr><td>\(F_x,\ F_y\)</td><td>"F-x, F-y"</td><td>The <strong>components</strong> of \(\vec{F}\) along the \(x\)- and \(y\)-axes. They are scalars with signs: \(F_x = -5\ \text{N}\) means 5 N in the \(-x\) direction.</td></tr>
<tr><td>\(F_\parallel,\ F_\perp\)</td><td>"F parallel, F perpendicular"</td><td>Components along and at right angles to a chosen direction (e.g. a slope).</td></tr>
<tr><td>\(\begin{pmatrix}6\\-8\end{pmatrix}\)</td><td>"column vector 6, −8"</td><td>A vector with \(x\)-component 6 and \(y\)-component −8. The top number is always \(x\).</td></tr>
<tr><td>\((6,\ -8)\)</td><td>"6, minus 8"</td><td>Bracket form: the same components written in a row. Also used for the coordinates of a point — read the context.</td></tr>
<tr><td>\((3,\ -2,\ 5)\)</td><td></td><td>A vector (or point) in three dimensions: \(x\), \(y\), \(z\) components.</td></tr>
</table></div>
<div class="box nota"><h4>These all describe the same force</h4>
\[ F_x = 6\ \text{N},\ F_y = -8\ \text{N} \quad = \quad \begin{pmatrix}6\\-8\end{pmatrix}\text{N} \quad = \quad (6,\ -8)\ \text{N} \quad = \quad 10\ \text{N at } 53.1^\circ \text{ below the } +x \text{ axis} \]
<p>In a CAPE answer, writing the components out in words and symbols (\(F_x = \ldots\), \(F_y = \ldots\)) is the clearest way to show your working.</p></div>

<h2>4. Operations</h2>
<div class="table-wrap"><table>
<tr><th>Notation</th><th>Say it as</th><th>Result is a…</th><th>Meaning</th></tr>
<tr><td>\(\vec{a} + \vec{b}\)</td><td>"a plus b"</td><td>vector</td><td>The resultant: draw \(\vec{b}\) from the tip of \(\vec{a}\) (tip-to-tail).</td></tr>
<tr><td>\(\vec{a} - \vec{b}\)</td><td>"a minus b"</td><td>vector</td><td>\(\vec{a} + (-\vec{b})\).</td></tr>
<tr><td>\(-\vec{a}\)</td><td>"minus a"</td><td>vector</td><td>Same magnitude, opposite direction.</td></tr>
<tr><td>\(\lambda\vec{a}\) (e.g. \(3\vec{a}\))</td><td>"lambda a"</td><td>vector</td><td>Scalar multiple: magnitude \(|\lambda|\,a\); same direction if \(\lambda>0\), reversed if \(\lambda<0\).</td></tr>
<tr><td>\(\vec{a}\cdot\vec{b}\)</td><td>"a dot b"</td><td><strong>scalar</strong></td><td>Scalar (dot) product \(= ab\cos\theta\). Used for work: \(W = \vec{F}\cdot\vec{s}\).</td></tr>
<tr><td>\(\vec{a}\times\vec{b}\)</td><td>"a cross b"</td><td><strong>vector</strong></td><td>Vector (cross) product, magnitude \(ab\sin\theta\), perpendicular to both. Used for torque: \(\vec{\tau} = \vec{r}\times\vec{F}\).</td></tr>
<tr><td>\(\Delta\vec{v}\)</td><td>"delta v", "change in v"</td><td>vector</td><td>Always <strong>final − initial</strong>: \(\Delta\vec{v} = \vec{v} - \vec{u}\).</td></tr>
<tr><td>\(\sum \vec{F}\)</td><td>"sigma F", "sum of the forces"</td><td>vector</td><td>Add all the forces (the resultant force).</td></tr>
</table></div>

<h2>5. Relationships</h2>
<div class="table-wrap"><table>
<tr><th>Notation</th><th>Say it as</th><th>Meaning / test</th></tr>
<tr><td>\(\vec{a} = \vec{b}\)</td><td>"a equals b"</td><td>Same magnitude <em>and</em> same direction (every component equal). Where they are drawn doesn't matter.</td></tr>
<tr><td>\(\vec{a}\parallel\vec{b}\)</td><td>"a is parallel to b"</td><td>\(\vec{a} = \lambda\vec{b}\) for some scalar \(\lambda\); equivalently \(\vec{a}\times\vec{b} = \vec{0}\).</td></tr>
<tr><td>\(\vec{a}\perp\vec{b}\)</td><td>"a is perpendicular to b"</td><td>\(\vec{a}\cdot\vec{b} = 0\).</td></tr>
<tr><td>\(\iff\)</td><td>"if and only if"</td><td>Both statements imply each other.</td></tr>
<tr><td>\(\lambda \in \mathbb{R}\)</td><td>"lambda is a real number"</td><td>Used for parameters in line equations \(\vec{r} = \vec{a} + \lambda\vec{d}\).</td></tr>
</table></div>

<h2>6. Positions, motion and relative velocity</h2>
<div class="table-wrap"><table>
<tr><th>Notation</th><th>Meaning</th></tr>
<tr><td>\(\vec{r}\), \(\vec{r}_A\) or \(\vec{a}\)</td><td>Position vector — displacement from the origin \(O\): \(\vec{a} = \overrightarrow{OA}\).</td></tr>
<tr><td>\(\overrightarrow{AB} = \vec{b} - \vec{a}\)</td><td>"End minus start".</td></tr>
<tr><td>\(\vec{u},\ \vec{v},\ \vec{a},\ \vec{s}\)</td><td>Initial velocity, velocity, acceleration, displacement (vector suvat).</td></tr>
<tr><td>\(\vec{v}_{AB}\) or \({}_A\vec{v}_B\)</td><td>Velocity of \(A\) relative to \(B\) \(= \vec{v}_A - \vec{v}_B\).</td></tr>
<tr><td>\(\vec{v}_{A\,\text{ground}} = \vec{v}_{A\,\text{water}} + \vec{v}_{\text{water ground}}\)</td><td>Chaining frames — the inner subscripts "cancel".</td></tr>
</table></div>

<h2>7. Directions: angles and bearings</h2>
<div class="grid">
<div class="card"><h3>Angle from +x</h3><p>Measured <strong>anticlockwise</strong> from the positive \(x\)-axis, 0° to 360°.</p><p>\(F_x = F\cos\theta,\ \ F_y = F\sin\theta\)</p><p class="muted small">Example: 20 N at 150° → \(F_x = -17.3\) N, \(F_y = 10\) N.</p></div>
<div class="card"><h3>Bearing</h3><p>Measured <strong>clockwise from north</strong>, always <strong>three figures</strong>: 045°, 270°, 008°.</p><p>East component \(= d\sin\beta\), north component \(= d\cos\beta\).</p><p class="muted small">Note the sin/cos swap compared with angles from +x.</p></div>
<div class="card"><h3>Words</h3><p>"30° above the −x axis", "N 40° E" (40° east of north = bearing 040°), "S 20° W" (bearing 200°). A wind "from the west" blows <em>towards</em> the east.</p></div>
</div>

<h2>8. Units written with negative indices</h2>
<p>CAPE uses the index style: \(\text{m s}^{-1}\) (not m/s), \(\text{m s}^{-2}\), \(\text{N m}\), \(\text{kg m s}^{-1}\), \(\text{N C}^{-1}\). Leave a space between unit symbols.</p>

<h2>9. Greek letters you will meet</h2>
<div class="table-wrap"><table>
<tr><th>Symbol</th><th>Name</th><th>Usual job in this topic</th><th>Symbol</th><th>Name</th><th>Usual job</th></tr>
<tr><td>\(\theta\)</td><td>theta</td><td>an angle</td><td>\(\lambda,\ \mu\)</td><td>lambda, mu</td><td>scalars / parameters; \(\mu\) also coefficient of friction</td></tr>
<tr><td>\(\alpha,\ \beta,\ \gamma\)</td><td>alpha, beta, gamma</td><td>angles; direction angles to the axes</td><td>\(\phi\)</td><td>phi</td><td>angle of the resultant</td></tr>
<tr><td>\(\omega\)</td><td>omega</td><td>angular velocity</td><td>\(\tau\)</td><td>tau</td><td>torque (moment)</td></tr>
<tr><td>\(\Delta\)</td><td>capital delta</td><td>"change in"</td><td>\(\Sigma\)</td><td>capital sigma</td><td>"sum of"</td></tr>
<tr><td>\(\rho\)</td><td>rho</td><td>perpendicular distance from an axis</td><td>\(\pi\)</td><td>pi</td><td>180° in radians</td></tr>
</table></div>

<h2>10. Command words and vocabulary</h2>
<div class="table-wrap"><table>
<tr><th>Word</th><th>Meaning</th></tr>
<tr><td>Resultant</td><td>The single vector with the same effect as all the vectors together (their vector sum).</td></tr>
<tr><td>Equilibrant</td><td>The single force that would bring the system into equilibrium: equal in size and opposite in direction to the resultant.</td></tr>
<tr><td>Resolve / component</td><td>Split a vector into perpendicular parts that together have the same effect.</td></tr>
<tr><td>Coplanar / concurrent / collinear</td><td>In one plane / through one point / on one straight line.</td></tr>
<tr><td>Heading vs track</td><td>Heading: the way the craft points (velocity relative to air/water). Track: the actual path over the ground.</td></tr>
<tr><td>Orthogonal</td><td>Perpendicular.</td></tr>
<tr><td>"Find the velocity"</td><td>A vector answer: give magnitude <strong>and</strong> direction, with the direction relative to something definite.</td></tr>
</table></div>

<div class="box tip"><h4>Handwriting checklist for exam scripts</h4>
<ul>
<li>Every vector symbol gets an arrow or an underline: \(\vec{F}\), \(\underline{F}\). Its magnitude does not: \(F\).</li>
<li>Label components clearly with subscripts: \(F_x\), \(F_y\), or "horizontal component", "vertical component".</li>
<li>Never write "\(\vec{a} = 5\)". Write \(|\vec{a}| = 5\) or \(a = 5\).</li>
<li>Work is a scalar: write \(W = 56\ \text{J}\) — never give work a direction.</li>
<li>Always state a direction with a reference: "12 N at 30° above the horizontal", "5.0 km on a bearing of 053°".</li>
</ul></div>
`;

/* ----------------------------------------------------------------------- */

const TOPICS = [
{
  id: 'V1', title: 'Scalars, Vectors and Notation', cape: 'Module 1 · 1.5 (distinguish scalars and vectors)', workbook: 'V1.1 – V1.17',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>A <strong>scalar</strong> quantity has magnitude only. A <strong>vector</strong> quantity has both magnitude and direction <em>and combines with other vectors by the triangle (parallelogram) law of addition</em>.</p>
<p>The second half of that definition is why <strong>electric current is a scalar</strong>: it flows "along" a wire, but two currents meeting at a junction simply add as numbers.</p></div>

<div class="table-wrap"><table>
<tr><th>Scalars</th><th>Vectors</th></tr>
<tr><td>mass, distance, speed, time, temperature, energy (all forms), work, power, pressure, density, charge, current, potential difference</td>
<td>displacement, velocity, acceleration, force (incl. weight, tension, friction, upthrust, normal reaction), momentum, impulse, gravitational / electric field strength, torque (moment)</td></tr>
</table></div>

<h3>Pairs that trip students up</h3>
<div class="table-wrap"><table>
<tr><th>Scalar</th><th>Vector partner</th><th>Difference</th></tr>
<tr><td>distance</td><td>displacement</td><td>Displacement is the distance moved <em>in a stated direction from a fixed point</em> (the change in position).</td></tr>
<tr><td>speed</td><td>velocity</td><td>Velocity is the rate of change of displacement.</td></tr>
<tr><td>mass</td><td>weight</td><td>Weight is the gravitational force on a mass: \(\vec{W} = m\vec{g}\).</td></tr>
</table></div>

<h3>Notation used in this topic</h3>
<p>In print a vector is bold (\(\mathbf{a}\)) or has an arrow (\(\vec{a}\)). By hand write \(\vec{a}\) or \(\underline{a}\). The vector from \(A\) to \(B\) is \(\overrightarrow{AB}\). The magnitude is \(|\vec{a}|\) or \(a\) and is never negative. \(-\vec{a}\) has the same size as \(\vec{a}\), opposite direction. Two vectors are <strong>equal</strong> if they have the same magnitude and direction — where they are drawn does not matter. <a href="#/notation">Full notation guide →</a></p>

<h3>Range of a resultant</h3>
<p>For two vectors of magnitudes \(a\) and \(b\):</p>
\[ |a - b| \;\le\; |\vec{a} + \vec{b}| \;\le\; a + b \]
<p>Largest when they point the same way, smallest when they are opposite.</p>

<div class="box example"><h4>Worked example</h4>
<p>Forces of 3 N and 4 N act on a particle. What values can the resultant take?</p>
<ol class="steps"><li>Largest: same direction, \(3 + 4 = 7\) N.</li><li>Smallest: opposite, \(|4 - 3| = 1\) N.</li><li>Any value from 1 N to 7 N is possible (5 N when they are at 90°).</li></ol></div>

<div class="box example"><h4>Worked example</h4>
<p>An athlete runs one lap of a 400 m track in 50 s. Find the distance, displacement, average speed and average velocity.</p>
<ol class="steps"><li>Distance = 400 m. Displacement = 0 (back where she started).</li><li>Average speed = \(400/50 = 8.0\ \text{m s}^{-1}\).</li><li>Average velocity = displacement ÷ time = \(0\).</li></ol></div>

<div class="box trap"><h4>Examiner's trap</h4><p>"Displacement is the distance moved" earns nothing — it needs the direction. "Velocity is speed" earns nothing — velocity is the <strong>rate of change of displacement</strong>. A car going round a roundabout at a constant 10 m s⁻¹ is accelerating because its <em>direction</em> changes.</p></div>`
},
{
  id: 'V2', title: 'Graphical Addition and Subtraction', cape: 'Module 1 · 1.5; 3.1', workbook: 'V2.1 – V2.15', fig: 'v2',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<ul>
<li><strong>Triangle (tip-to-tail) rule.</strong> To find \(\vec{a} + \vec{b}\): draw \(\vec{a}\), then draw \(\vec{b}\) starting at the tip of \(\vec{a}\). The resultant runs from the tail of \(\vec{a}\) to the tip of \(\vec{b}\).</li>
<li><strong>Parallelogram rule.</strong> Draw \(\vec{a}\) and \(\vec{b}\) from the same point; complete the parallelogram; the resultant is the diagonal from the common point.</li>
<li><strong>Polygon rule.</strong> For several vectors keep going tip-to-tail; the resultant closes the polygon. If the polygon closes by itself the resultant is zero.</li>
<li><strong>Subtraction.</strong> \(\vec{a} - \vec{b} = \vec{a} + (-\vec{b})\): reverse \(\vec{b}\) and add. Or draw both from one point: \(\vec{a} - \vec{b}\) runs from the tip of \(\vec{b}\) to the tip of \(\vec{a}\).</li>
<li><strong>Change in a vector.</strong> \(\Delta\vec{v} = \vec{v}_{\text{final}} - \vec{v}_{\text{initial}}\) — always final minus initial.</li>
</ul></div>
<div class="figure" data-fig="v2"></div>
<p class="muted small" style="text-align:center">Blue \(\vec{a}\), orange \(\vec{b}\) drawn tip-to-tail, green resultant \(\vec{a}+\vec{b}\).</p>

<h3>Scale-drawing checklist</h3>
<ol><li>State the scale (e.g. 1 cm : 10 N) and choose it so the diagram fills at least half the page.</li>
<li>Sharp pencil, ruler, protractor. Mark the resultant with a double arrow.</li>
<li>Measure length and angle, convert back using the scale.</li>
<li>Quote a sensible number of significant figures (usually 2 for a drawing).</li></ol>

<div class="box example"><h4>Worked example — perpendicular vectors</h4>
<p>A student walks 3.0 m due east then 4.0 m due north. Find the resultant displacement.</p>
<ol class="steps"><li>Tip-to-tail gives a right-angled triangle: \(R = \sqrt{3.0^2 + 4.0^2} = 5.0\) m.</li>
<li>Angle north of east: \(\tan^{-1}(4.0/3.0) = 53.1^\circ\). As a bearing: \(90^\circ - 53.1^\circ = 036.9^\circ\).</li>
<li>Answer: 5.0 m on a bearing of 036.9° (53.1° north of east).</li></ol></div>

<div class="box example"><h4>Worked example — change in velocity</h4>
<p>A ball's velocity changes from 20 m s⁻¹ due east to 20 m s⁻¹ due north. Find \(\Delta\vec{v}\).</p>
<ol class="steps"><li>\(\Delta\vec{v} = \vec{v} - \vec{u} = \vec{v} + (-\vec{u})\): 20 north plus 20 <em>west</em>.</li>
<li>\(|\Delta\vec{v}| = \sqrt{20^2 + 20^2} = 28.3\ \text{m s}^{-1}\).</li>
<li>Direction: north-west (bearing 315°). The speed didn't change, but the velocity did!</li></ol></div>

<div class="box trap"><h4>Examiner's trap</h4><p>Drawing both vectors from the same point and joining their <em>tips</em> gives the <strong>difference</strong> \(\vec{a} - \vec{b}\), not the sum. For the sum go tip-to-tail, or take the parallelogram diagonal from the common tail.</p></div>
<p>Why is the component method (V5) preferred in exams? A scale drawing has errors from the scale, drawing angles, and measuring; a calculation is exact and shows the examiner every step.</p>`
},
{
  id: 'V3', title: 'Resolving a Vector into Components', cape: 'Module 1 · 1.5 (resolve graphically and by calculation)', workbook: 'V3.1 – V3.18', fig: 'v3',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>Any vector \(\vec{F}\) can be replaced by two perpendicular vectors — its <strong>components</strong> — that together have exactly the same effect. If \(\vec{F}\) makes angle \(\theta\) with the \(x\)-axis:</p>
\[ F_x = F\cos\theta, \qquad F_y = F\sin\theta \]
<p><strong>Adjacent uses cos, opposite uses sin.</strong> The component <em>next to</em> the angle is \(F\cos\theta\). If the angle is given to the <em>vertical</em>, the vertical component is \(F\cos\theta\) and the horizontal is \(F\sin\theta\).</p></div>
<div class="figure" data-fig="v3"></div>

<h3>Getting the signs right</h3>
<p>Work out the sizes using the acute angle, then attach signs by looking at the diagram: <strong>left and down are negative</strong> with the usual axes. (If you use the angle measured anticlockwise from \(+x\) all the way round, the calculator gives the signs automatically.)</p>

<div class="box example"><h4>Worked example</h4>
<p>Find the components of a 70 km displacement at 25° above the \(-x\) axis.</p>
<ol class="steps"><li>Sizes: \(70\cos25^\circ = 63.4\) km, \(70\sin25^\circ = 29.6\) km.</li>
<li>It points left (−) and up (+): \(d_x = -63.4\) km, \(d_y = +29.6\) km.</li>
<li>Check with angle from \(+x\): \(180 - 25 = 155^\circ\); \(70\cos155^\circ = -63.4\) ✓.</li></ol></div>

<h3>Inclined planes</h3>
<p>For a weight \(mg\) on a slope of angle \(\theta\):</p>
\[ \text{down the slope: } mg\sin\theta \qquad \text{into the slope: } mg\cos\theta \]
<p>The angle between the weight and the normal to the slope equals the slope angle \(\theta\).</p>
<div class="figure" data-fig="slope"></div>

<div class="box example"><h4>Worked example</h4>
<p>A 5.0 kg block rests on a 30° slope. Find the components of its weight.</p>
<ol class="steps"><li>\(mg = 5.0 \times 9.81 = 49.05\) N.</li>
<li>Parallel: \(49.05\sin30^\circ = 24.5\) N down the slope.</li>
<li>Perpendicular: \(49.05\cos30^\circ = 42.5\) N into the slope.</li></ol></div>

<div class="box trap"><h4>Examiner's trap</h4><p>On inclines students often write the component down the slope as \(mg\cos\theta\). <strong>Test with an extreme case</strong>: if the slope is flat (\(\theta = 0\)) nothing pulls the block along it — \(mg\sin0 = 0\) ✓, whereas \(mg\cos 0 = mg\) ✗. Five seconds, catches it every time.</p></div>
<p><strong>Always check:</strong> \(F_x^2 + F_y^2 = F^2\), and neither component can be bigger than \(F\).</p>

<h3>Bearings into components</h3>
<p>Taking east and north as the axes, a displacement \(d\) on bearing \(\beta\) has east component \(d\sin\beta\) and north component \(d\cos\beta\). E.g. 20 km on 035°: 11.5 km east and 16.4 km north.</p>`
},
{
  id: 'V4', title: 'Magnitude and Direction from Components; Bearings', cape: 'Module 1 · 1.5; 3.1–3.7', workbook: 'V4.1 – V4.13', fig: 'v4',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>Given components \((a_x, a_y)\):</p>
\[ |\vec{a}| = \sqrt{a_x^2 + a_y^2}, \qquad \alpha = \tan^{-1}\!\left(\frac{|a_y|}{|a_x|}\right)\ \ \text{(acute angle to the } x\text{-axis)} \]
<p><strong>Always sketch the quadrant first.</strong> The calculator's \(\tan^{-1}\) only returns −90° to 90°; it cannot tell \((-3, 4)\) from \((3, -4)\).</p></div>

<div class="table-wrap"><table>
<tr><th>Quadrant</th><th>Signs \((a_x, a_y)\)</th><th>Angle from +x</th></tr>
<tr><td>Q1</td><td>(+, +)</td><td>\(\alpha\)</td></tr>
<tr><td>Q2</td><td>(−, +)</td><td>\(180^\circ - \alpha\)</td></tr>
<tr><td>Q3</td><td>(−, −)</td><td>\(180^\circ + \alpha\)</td></tr>
<tr><td>Q4</td><td>(+, −)</td><td>\(360^\circ - \alpha\)</td></tr>
</table></div>
<div class="figure" data-fig="v4"></div>

<div class="box example"><h4>Worked example</h4>
<p>Find the magnitude and direction of \((-8, 15)\).</p>
<ol class="steps"><li>\(|\vec{a}| = \sqrt{64 + 225} = 17\).</li>
<li>Acute angle: \(\tan^{-1}(15/8) = 61.9^\circ\).</li>
<li>Sketch: left and up → Q2. Angle from \(+x\) = \(180 - 61.9 = 118.1^\circ\), i.e. 61.9° above the \(-x\) axis.</li></ol></div>

<h3>Bearings</h3>
<p>Measured clockwise from north, three figures. Each leg of length \(d\) on bearing \(\beta\) has east component \(d\sin\beta\) and north component \(d\cos\beta\). Add the easts, add the norths, then convert back:</p>
\[ R = \sqrt{E^2 + N^2}, \qquad \text{bearing from the sketch using } \tan^{-1}(|E|/|N|) \]

<div class="box example"><h4>Worked example</h4>
<p>A boat sails 12 km on 060°, then 5 km on 150°. Find its final distance and bearing from the start.</p>
<ol class="steps"><li>East: \(12\sin60^\circ + 5\sin150^\circ = 10.39 + 2.50 = 12.89\) km.</li>
<li>North: \(12\cos60^\circ + 5\cos150^\circ = 6.00 - 4.33 = 1.67\) km.</li>
<li>\(R = \sqrt{12.89^2 + 1.67^2} = 13.0\) km.</li>
<li>Both positive → NE quadrant: bearing \(= \tan^{-1}(12.89/1.67) = 082.6^\circ\).</li></ol></div>

<div class="box trap"><h4>Examiner's trap</h4><p>When asked for a vector ("find the resultant velocity") candidates often give only the magnitude. A vector answer needs a magnitude <strong>and</strong> a direction stated relative to something definite (an axis, north, the horizontal, a named force).</p></div>`
},
{
  id: 'V5', title: 'Adding and Subtracting Vectors by Components', cape: 'Module 1 · 1.5; 3.8–3.17 (resultant force)', workbook: 'V5.1 – V5.22',
  html: String.raw`
<div class="box need"><h4>The component method — works for any number of vectors</h4>
<ol><li>Choose axes (usually \(x\) horizontal, \(y\) vertical; for slopes, along and perpendicular to the slope).</li>
<li>Resolve every vector, <strong>with signs</strong>.</li>
<li>Add all the \(x\)-components to get \(R_x\); add all the \(y\)-components to get \(R_y\).</li>
<li>\(R = \sqrt{R_x^2 + R_y^2}\); direction from \(\tan^{-1}(|R_y|/|R_x|)\) plus a quadrant sketch.</li></ol></div>

<p>A tidy table is the best layout — it shows every step and makes errors easy to find.</p>

<div class="box example"><h4>Worked example</h4>
<p>Find the resultant of 15 N at 30° and 25 N at 120° (angles anticlockwise from \(+x\)).</p>
<div class="table-wrap"><table>
<tr><th>Force</th><th>\(x\)-component</th><th>\(y\)-component</th></tr>
<tr><td>15 N at 30°</td><td>\(15\cos30^\circ = 12.99\)</td><td>\(15\sin30^\circ = 7.50\)</td></tr>
<tr><td>25 N at 120°</td><td>\(25\cos120^\circ = -12.50\)</td><td>\(25\sin120^\circ = 21.65\)</td></tr>
<tr><th>Sum</th><th>\(R_x = 0.49\)</th><th>\(R_y = 29.15\)</th></tr>
</table></div>
<ol class="steps"><li>\(R = \sqrt{0.49^2 + 29.15^2} = 29.2\) N.</li>
<li>Q1: angle \(= \tan^{-1}(29.15/0.49) = 89.0^\circ\) from \(+x\).</li></ol></div>

<h3>Subtraction</h3>
<p>Same method, signs reversed: \((\vec{a} - \vec{b})_x = a_x - b_x\), \((\vec{a} - \vec{b})_y = a_y - b_y\).</p>

<h3>Equilibrium and the equilibrant</h3>
<p>Equilibrium means the resultant is zero: \(\sum F_x = 0\) and \(\sum F_y = 0\). The <strong>equilibrant</strong> is the force that would produce equilibrium — equal in magnitude and opposite in direction to the resultant (add 180° to the resultant's angle).</p>
<div class="box tip"><h4>Tip</h4><p>For a vector pointing exactly along an axis, write the components straight down (e.g. 40 N at 270° is \((0, -40)\)) — don't let calculator rounding give you \(-7\times10^{-15}\).</p></div>`
},
{
  id: 'V6', title: 'Non-Perpendicular Vectors: Cosine and Sine Rules', cape: 'Module 1 · 1.5; equilibrium problems', workbook: 'V6.1 – V6.17', fig: 'v6',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>When two vectors \(\vec{P}\) and \(\vec{Q}\) act at a point with angle \(\theta\) <strong>between them</strong>:</p>
\[ R^2 = P^2 + Q^2 + 2PQ\cos\theta, \qquad \tan\phi = \frac{Q\sin\theta}{P + Q\cos\theta} \]
<p>where \(\phi\) is the angle between \(\vec{R}\) and \(\vec{P}\). The \(+\) sign appears because the angle inside the triangle is \(180^\circ - \theta\) and \(\cos(180^\circ - \theta) = -\cos\theta\).</p></div>
<div class="figure" data-fig="v6"></div>

<h3>Special cases</h3>
<ul><li>\(\theta = 0\): \(R = P + Q\). \(\theta = 180^\circ\): \(R = |P - Q|\). \(\theta = 90^\circ\): \(R = \sqrt{P^2 + Q^2}\).</li>
<li>Equal vectors \(P = Q = F\): \(R = 2F\cos(\theta/2)\), and \(\vec{R}\) bisects the angle.</li></ul>

<h3>Triangle-of-vectors toolkit</h3>
\[ c^2 = a^2 + b^2 - 2ab\cos C \qquad\qquad \frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} \]

<div class="box example"><h4>Worked example</h4>
<p>Forces of 6 N and 8 N act at 60° to each other. Find the resultant.</p>
<ol class="steps"><li>\(R^2 = 36 + 64 + 2(6)(8)\cos60^\circ = 148\) → \(R = 12.2\) N.</li>
<li>\(\tan\phi = \dfrac{8\sin60^\circ}{6 + 8\cos60^\circ} = \dfrac{6.928}{10}\) → \(\phi = 34.7^\circ\) to the 6 N force.</li></ol></div>

<h3>Resolving along two non-perpendicular directions</h3>
<p>Draw the vector as the diagonal of a parallelogram whose sides lie along the two given directions, then apply the sine rule to one triangle. E.g. 50 N split into components at 30° and 45° either side: the triangle has angles 30°, 45°, 105°, so \(F_1 = 50\sin45^\circ/\sin105^\circ = 36.6\) N and \(F_2 = 50\sin30^\circ/\sin105^\circ = 25.9\) N.</p>

<div class="box trap"><h4>Examiner's trap</h4><p>Using \(R^2 = P^2 + Q^2 - 2PQ\cos\theta\) with \(\theta\) the angle <em>between</em> the vectors gives \(|\vec{P} - \vec{Q}|\), not \(|\vec{P} + \vec{Q}|\). Decide: is your angle <strong>between the vectors</strong> (use +) or <strong>inside the triangle</strong> (use −)?</p></div>`
},
{
  id: 'V7', title: 'Component Form and 3-D Vectors', cape: 'Toolkit for Module 1 · 3.x', workbook: 'V7.1 – V7.17',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>A vector can be written by its components as a column vector or in brackets. In two dimensions \(\vec{a} = \begin{pmatrix}a_x\\a_y\end{pmatrix} = (a_x,\ a_y)\); in three dimensions add a \(z\)-component:</p>
\[ \vec{a} = \begin{pmatrix}a_x\\a_y\\a_z\end{pmatrix} = (a_x,\ a_y,\ a_z) \]
<p>Operations are done <strong>component by component</strong>: \(\vec{a} \pm \vec{b} = (a_x \pm b_x,\ a_y \pm b_y,\ a_z \pm b_z)\), and \(\lambda\vec{a} = (\lambda a_x,\ \lambda a_y,\ \lambda a_z)\).</p></div>

<h3>Magnitude</h3>
\[ |\vec{a}| = \sqrt{a_x^2 + a_y^2 + a_z^2} \qquad \text{(Pythagoras, applied twice)} \]
<p>To get a vector of magnitude \(k\) in the same direction as \(\vec{a}\), multiply every component by \(k/|\vec{a}|\).</p>

<h3>Direction cosines</h3>
<p>If \(\vec{a}\) makes angles \(\alpha, \beta, \gamma\) with the \(x, y, z\) axes:</p>
\[ \cos\alpha = \frac{a_x}{|\vec{a}|},\quad \cos\beta = \frac{a_y}{|\vec{a}|},\quad \cos\gamma = \frac{a_z}{|\vec{a}|}, \qquad \cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1 \]

<div class="box example"><h4>Worked example</h4>
<p>For \(\vec{a} = (2,\ -1,\ -2)\), find \(|\vec{a}|\), a vector of magnitude 6 in the same direction, and the angles with the axes.</p>
<ol class="steps"><li>\(|\vec{a}| = \sqrt{4 + 1 + 4} = 3\).</li>
<li>Magnitude 6: multiply by \(6/3 = 2\) → \((4,\ -2,\ -4)\).</li>
<li>\(\alpha = \cos^{-1}(2/3) = 48.2^\circ\), \(\beta = \cos^{-1}(-1/3) = 109.5^\circ\), \(\gamma = \cos^{-1}(-2/3) = 131.8^\circ\).</li></ol></div>

<h3>Parallel and equal vectors</h3>
<p>\(\vec{a}\parallel\vec{b}\) if and only if \(\vec{a} = \lambda\vec{b}\) — every component in the same ratio. E.g. \((3,\ k,\ -2)\) is parallel to \((-6,\ 8,\ 4)\) when \(\lambda = -\tfrac12\), so \(k = -4\). Equal vectors have every component equal: \((p+2,\ 3) = (5,\ q-1)\) gives \(p = 3,\ q = 4\).</p>

<div class="box trap"><h4>Examiner's trap</h4><p>Writing \(|\vec{a}| = a_x + a_y + a_z\) (adding components instead of Pythagoras) is the single most common error in this topic. Also: \((-3)^2 = +9\), but typing <code>-3²</code> on many calculators gives −9. Use brackets.</p></div>`
},
{
  id: 'V8', title: 'Position Vectors and Vector Geometry', cape: 'Relative position (Module 1 · 3.x)', workbook: 'V8.1 – V8.14',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>The <strong>position vector</strong> of a point \(A\) is its displacement from the origin: \(\vec{a} = \overrightarrow{OA}\).</p>
\[ \overrightarrow{AB} = \vec{b} - \vec{a} \quad \text{("end minus start")}, \qquad \text{because } \overrightarrow{OA} + \overrightarrow{AB} = \overrightarrow{OB}. \]
<p>Distance \(AB = |\vec{b} - \vec{a}|\). Midpoint: \(\vec{m} = \tfrac12(\vec{a} + \vec{b})\).</p></div>

<h3>Section (ratio) formula</h3>
<p>If \(P\) lies on \(AB\) with \(AP : PB = m : n\), then</p>
\[ \vec{p} = \frac{n\vec{a} + m\vec{b}}{m + n} \]
<p>Notice the "cross-over": \(m\) goes with \(\vec{b}\). Check with the midpoint (\(m = n\)).</p>

<div class="box example"><h4>Worked example</h4>
<p>\(\vec{a} = (2,\ -1,\ 4)\), \(\vec{b} = (7,\ 9,\ -1)\). Find \(P\) with \(AP : PB = 2 : 3\).</p>
<ol class="steps"><li>\(\vec{p} = \dfrac{3\vec{a} + 2\vec{b}}{5} = \dfrac{(6 + 14,\ -3 + 18,\ 12 - 2)}{5}\).</li>
<li>\(\vec{p} = (4,\ 3,\ 2)\).</li></ol></div>

<h3>Collinearity</h3>
<p>\(A, B, C\) lie on one straight line if \(\overrightarrow{AC} = \lambda\overrightarrow{AB}\) for some scalar \(\lambda\) (parallel <em>and</em> sharing the point \(A\)).</p>

<h3>Proof technique</h3>
<ul><li>To show two lines are parallel, show one vector is a scalar multiple of the other.</li>
<li>To find where two lines meet, write the intersection point in two ways with unknown scalars \(\lambda, \mu\), then equate coefficients of the two non-parallel base vectors.</li></ul>

<div class="box example"><h4>Worked example — parallelogram</h4>
<p>\(ABCD\) is a parallelogram with \(A(1,2)\), \(B(5,3)\), \(C(7,7)\). Find \(D\).</p>
<ol class="steps"><li>In a parallelogram \(\overrightarrow{AD} = \overrightarrow{BC}\), so \(\vec{d} = \vec{a} + \vec{c} - \vec{b}\).</li>
<li>\(\vec{d} = (1 + 7 - 5,\ 2 + 7 - 3) = (3, 6)\).</li></ol></div>`
},
{
  id: 'V9', title: 'The Scalar (Dot) Product', cape: 'Module 1 · 5.1 work \(W = Fs\cos\theta\); 5.x power', workbook: 'V9.1 – V9.20',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
\[ \vec{a}\cdot\vec{b} = |\vec{a}||\vec{b}|\cos\theta \qquad (0 \le \theta \le 180^\circ,\ \text{vectors drawn tail-to-tail}) \]
<p>The result is a <strong>scalar</strong>. In components:</p>
\[ \vec{a}\cdot\vec{b} = a_xb_x + a_yb_y + a_zb_z \]
<p>Multiply matching components and add. For CAPE the key form is \(W = Fs\cos\theta\): only the component of the force along the displacement does work.</p></div>

<h3>What it's used for</h3>
<ul><li><strong>Angle between vectors:</strong> \(\cos\theta = \dfrac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}\).</li>
<li><strong>Perpendicular test:</strong> non-zero \(\vec{a} \perp \vec{b} \iff \vec{a}\cdot\vec{b} = 0\). Also \(\vec{a}\cdot\vec{a} = |\vec{a}|^2\).</li>
<li><strong>Projection:</strong> the component of \(\vec{a}\) along \(\vec{b}\) is \(a\cos\theta = \dfrac{\vec{a}\cdot\vec{b}}{|\vec{b}|}\).</li>
<li><strong>Physics:</strong> work \(W = \vec{F}\cdot\vec{s}\); power \(P = \vec{F}\cdot\vec{v}\); magnetic flux \(\Phi = \vec{B}\cdot\vec{A}\). Only the component of one vector along the other matters.</li></ul>

<div class="box example"><h4>Worked example</h4>
<p>Find the angle between \(\vec{a} = (3,\ 4)\) and \(\vec{b} = (5,\ 12)\).</p>
<ol class="steps"><li>\(\vec{a}\cdot\vec{b} = 3(5) + 4(12) = 63\).</li>
<li>\(|\vec{a}| = 5\), \(|\vec{b}| = 13\).</li>
<li>\(\cos\theta = 63/65\) → \(\theta = 14.3^\circ\).</li></ol></div>

<div class="box example"><h4>Worked example — work</h4>
<p>A force \(\vec{F} = (12,\ 5)\) N moves its point of application through \(\vec{s} = (3,\ 4)\) m. Find the work done.</p>
<ol class="steps"><li>\(W = \vec{F}\cdot\vec{s} = 12(3) + 5(4) = 56\) J.</li></ol></div>

<div class="box trap"><h4>Examiner's trap</h4><p>Work is a <strong>scalar</strong>. Writing \(W = (12,\ 5)\) J, or giving work a direction, loses the mark. A dot product answer is always a single number.</p></div>
<p>Algebra rules: commutative (\(\vec{a}\cdot\vec{b} = \vec{b}\cdot\vec{a}\)) and distributive (\(\vec{a}\cdot(\vec{b} + \vec{c}) = \vec{a}\cdot\vec{b} + \vec{a}\cdot\vec{c}\)).</p>`
},
{
  id: 'V10', title: 'The Vector (Cross) Product', cape: 'Module 1 · 4.x moments / torque', workbook: 'V10.1 – V10.17',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
\[ |\vec{a}\times\vec{b}| = |\vec{a}||\vec{b}|\sin\theta \]
<p>The direction is perpendicular to both \(\vec{a}\) and \(\vec{b}\), given by the <strong>right-hand rule</strong>: curl the fingers of your right hand from \(\vec{a}\) towards \(\vec{b}\) through the smaller angle; your thumb points along \(\vec{a}\times\vec{b}\). The result is a <strong>vector</strong>.</p></div>

<h3>Component form</h3>
\[ \vec{a}\times\vec{b} = (a_yb_z - a_zb_y,\ \ a_zb_x - a_xb_z,\ \ a_xb_y - a_yb_x) \]
<p>Pattern: for the \(x\)-component cover up the \(x\)s and cross-multiply the \(y\) and \(z\) values; the \(y\)-component starts with \(z\); the \(z\)-component starts with \(x\) (cyclic order \(x \to y \to z \to x\)).</p>

<div class="box example"><h4>Worked example</h4>
<p>Find \((1,\ 2,\ 3)\times(4,\ 5,\ 6)\).</p>
<ol class="steps"><li>\(x\): \(2(6) - 3(5) = -3\).</li>
<li>\(y\): \(3(4) - 1(6) = +6\).</li>
<li>\(z\): \(1(5) - 2(4) = -3\).</li>
<li>Answer \((-3,\ 6,\ -3)\). Check: \((-3)(1) + 6(2) + (-3)(3) = 0\) ✓ perpendicular to \(\vec{a}\).</li></ol></div>

<h3>Properties</h3>
<ul><li>Anti-commutative: \(\vec{b}\times\vec{a} = -\vec{a}\times\vec{b}\). Distributive over addition. <em>Not</em> associative.</li>
<li>\(\vec{a}\times\vec{b} = \vec{0} \iff \vec{a}\parallel\vec{b}\) (or one is zero).</li>
<li>\(|\vec{a}\times\vec{b}|\) = area of the parallelogram with sides \(\vec{a}, \vec{b}\); half of it is the triangle's area.</li></ul>

<h3>Physics</h3>
<p>Torque \(\vec{\tau} = \vec{r}\times\vec{F}\) (magnitude \(rF\sin\theta\) — the CAPE "moment = force × perpendicular distance"); angular momentum \(\vec{L} = \vec{r}\times\vec{p}\); magnetic force \(\vec{F} = q\vec{v}\times\vec{B}\); rotation \(\vec{v} = \vec{\omega}\times\vec{r}\).</p>

<div class="box example"><h4>Worked example — torque</h4>
<p>A 10 N force acts in the \(+x\) direction at a point \(\vec{r} = (0.300,\ 0.400)\) m from a pivot. Find the torque.</p>
<ol class="steps"><li>CAPE method: moment = force × perpendicular distance from the pivot to the line of action. The line of action is horizontal and 0.400 m from the pivot, so \(\tau = 10 \times 0.400 = 4.00\) N m.</li>
<li>Direction: the force acts to the right above the pivot, so the moment is <strong>clockwise</strong>. (The cross product gives the same: \(\vec{r}\times\vec{F} = (0,\ 0,\ -4.00)\) N m, and \(-z\) means clockwise seen from the front.)</li></ol></div>

<div class="box trap"><h4>Examiner's trap</h4><p>(i) Getting the order wrong in the middle (\(y\)) component — it is \(a_zb_x - a_xb_z\). (ii) Using \(|\vec{a}\times\vec{b}| = ab\sin\theta\) to find an angle — \(\sin\theta\) cannot tell \(\theta\) from \(180^\circ - \theta\). Use the dot product for angles. Always check \((\vec{a}\times\vec{b})\cdot\vec{a} = 0\).</p></div>`
},
{
  id: 'V11', title: 'Triple Products', cape: 'Beyond CAPE', beyond: true, workbook: 'V11.1 – V11.10',
  html: String.raw`
<div class="box tip"><h4>Extension</h4><p>Not examined directly in CAPE, but it makes volumes and coplanarity quick, and university courses assume it.</p></div>
<div class="box need"><h4>Scalar triple product</h4>
\[ [\vec{a}, \vec{b}, \vec{c}] = \vec{a}\cdot(\vec{b}\times\vec{c}) = \begin{vmatrix}a_x & a_y & a_z\\ b_x & b_y & b_z\\ c_x & c_y & c_z\end{vmatrix} \]
<ul><li>\(|\vec{a}\cdot(\vec{b}\times\vec{c})|\) is the <strong>volume of the parallelepiped</strong> with edges \(\vec{a}, \vec{b}, \vec{c}\); the tetrahedron on the same edges has \(\tfrac16\) of it.</li>
<li>\(\vec{a}\cdot(\vec{b}\times\vec{c}) = 0 \iff\) the vectors are <strong>coplanar</strong>.</li>
<li>Cyclic: \(\vec{a}\cdot(\vec{b}\times\vec{c}) = \vec{b}\cdot(\vec{c}\times\vec{a}) = \vec{c}\cdot(\vec{a}\times\vec{b})\); swapping two vectors changes the sign.</li></ul></div>

<div class="box example"><h4>Worked example</h4>
<p>\(\vec{a} = (2,\ 1,\ 0)\), \(\vec{b} = (0,\ 3,\ 1)\), \(\vec{c} = (1,\ 0,\ 4)\). Find the volume of the parallelepiped.</p>
<ol class="steps"><li>\(\vec{b}\times\vec{c} = (3\cdot4 - 1\cdot0,\ 1\cdot1 - 0\cdot4,\ 0\cdot0 - 3\cdot1) = (12,\ 1,\ -3)\).</li>
<li>\(\vec{a}\cdot(\vec{b}\times\vec{c}) = 24 + 1 + 0 = 25\). Volume 25; tetrahedron \(25/6 = 4.17\).</li></ol></div>

<div class="box need"><h4>Vector triple product ("BAC − CAB")</h4>
\[ \vec{a}\times(\vec{b}\times\vec{c}) = \vec{b}(\vec{a}\cdot\vec{c}) - \vec{c}(\vec{a}\cdot\vec{b}) \]
<p>The result lies in the plane of \(\vec{b}\) and \(\vec{c}\). Brackets matter: \(\vec{a}\times(\vec{b}\times\vec{c}) \ne (\vec{a}\times\vec{b})\times\vec{c}\) in general.</p></div>`
},
{
  id: 'V12', title: 'Vector Equations of Lines and Planes', cape: 'Beyond CAPE', beyond: true, workbook: 'V12.1 – V12.15',
  html: String.raw`
<div class="box tip"><h4>Extension</h4><p>The line equation \(\vec{r} = \vec{r}_0 + \vec{v}t\) is exactly the motion of a body at constant velocity — so this section links straight back to kinematics and closest-approach problems.</p></div>
<div class="box need"><h4>Line</h4>
<p>The line through point \(A\) (position vector \(\vec{a}\)) with direction \(\vec{d}\):</p>
\[ \vec{r} = \vec{a} + \lambda\vec{d}, \qquad \lambda\in\mathbb{R} \]
<p>Each value of \(\lambda\) gives one point. Through \(A\) and \(B\): \(\vec{r} = \vec{a} + \lambda(\vec{b} - \vec{a})\).</p>
<p>Parametric form: \(x = a_x + \lambda d_x\), \(y = a_y + \lambda d_y\), \(z = a_z + \lambda d_z\). Cartesian: \(\dfrac{x - a_x}{d_x} = \dfrac{y - a_y}{d_y} = \dfrac{z - a_z}{d_z}\).</p></div>

<p>Two lines in 3-D are <strong>parallel</strong> (directions are multiples), <strong>intersecting</strong> (a common point exists) or <strong>skew</strong> (neither). To test: equate the parametric forms, solve two of the component equations, check the third. The angle between lines is the angle between their direction vectors.</p>

<div class="box need"><h4>Plane</h4>
<p>With normal \(\vec{n}\) through point \(A\): \(\vec{r}\cdot\vec{n} = \vec{a}\cdot\vec{n}\), i.e. \(n_xx + n_yy + n_zz = d\). Through three points: \(\vec{n} = \overrightarrow{AB}\times\overrightarrow{AC}\).</p></div>

<h3>Distances</h3>
\[ \text{point to plane: } \frac{|\vec{p}\cdot\vec{n} - d|}{|\vec{n}|} \qquad \text{point to line: } \frac{|\overrightarrow{AP}\times\vec{d}|}{|\vec{d}|} \qquad \text{skew lines: } \frac{|(\vec{b} - \vec{a})\cdot(\vec{d}_1\times\vec{d}_2)|}{|\vec{d}_1\times\vec{d}_2|} \]

<div class="box example"><h4>Worked example</h4>
<p>Find the distance from \(P(1, 1, 1)\) to the plane \(2x - y + 2z = 9\).</p>
<ol class="steps"><li>\(\vec{n} = (2, -1, 2)\), \(|\vec{n}| = 3\).</li>
<li>\(\vec{p}\cdot\vec{n} = 2 - 1 + 2 = 3\). Distance \(= |3 - 9|/3 = 2\).</li></ol></div>`
},
{
  id: 'V13', title: 'Forces in Equilibrium', cape: 'Module 1 · 4.x (equilibrium, triangle of forces)', workbook: 'V13.1 – V13.18', fig: 'v13',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>A particle is in <strong>equilibrium</strong> when the vector sum of the forces on it is zero:</p>
\[ \sum\vec{F} = \vec{0} \quad\iff\quad \sum F_x = 0 \ \text{ and } \ \sum F_y = 0 \]
<p>It is then at rest <em>or moving with constant velocity</em>.</p></div>

<h3>Triangle of forces</h3>
<p>If three coplanar forces are in equilibrium they can be drawn tip-to-tail to form a <strong>closed triangle</strong>. More forces form a closed polygon.</p>

<h3>Lami's theorem</h3>
<p>For three forces \(P, Q, R\) in equilibrium at a point, with \(\alpha\) the angle between \(Q\) and \(R\) (opposite \(P\)), etc.:</p>
\[ \frac{P}{\sin\alpha} = \frac{Q}{\sin\beta} = \frac{R}{\sin\gamma} \]
<div class="figure" data-fig="v13"></div>

<h3>Method</h3>
<ol><li>Draw a large free-body diagram showing <strong>every</strong> force on the body, with its direction.</li>
<li>Choose axes — along a slope if there is one.</li>
<li>Resolve and write \(\sum F_x = 0\), \(\sum F_y = 0\).</li>
<li>Solve. Check by resolving in a third direction.</li></ol>

<div class="box example"><h4>Worked example</h4>
<p>A 50 N lamp hangs from two cables: cable 1 at 30° to the horizontal, cable 2 at 60° on the other side. Find the tensions.</p>
<ol class="steps"><li>Horizontal: \(T_1\cos30^\circ = T_2\cos60^\circ\).</li>
<li>Vertical: \(T_1\sin30^\circ + T_2\sin60^\circ = 50\).</li>
<li>From (1): \(T_2 = 1.732\,T_1\). Substitute: \(0.5T_1 + 1.5T_1 = 50\) → \(T_1 = 25.0\) N, \(T_2 = 43.3\) N.</li>
<li>Lami check: the angles between the forces are 90° (between the cables), 120° and 150°. \(T_1 = 50\sin150^\circ/\sin90^\circ = 25\) ✓.</li></ol></div>

<div class="box example"><h4>Worked example — symmetrical strings</h4>
<p>A 12 N picture hangs from a string whose halves each make 30° with the horizontal.</p>
<ol class="steps"><li>Vertical: \(2T\sin30^\circ = 12\) → \(T = 12\) N. As the angle gets smaller the tension grows without limit — which is why a loaded washing line or tightrope can never be perfectly horizontal.</li></ol></div>

<h3>Friction (for rough surfaces)</h3>
<p>Limiting friction \(F = \mu R\); \(F \le \mu R\) when not slipping. Friction opposes the (tendency to) motion. On a rough slope: pushing up at constant speed needs \(mg(\sin\theta + \mu\cos\theta)\); just stopping it sliding down needs \(mg(\sin\theta - \mu\cos\theta)\).</p>

<div class="box trap"><h4>Examiner's trap</h4><p>Marks are lost by (i) omitting a force from the free-body diagram (usually normal reaction or friction), (ii) including forces that act on <em>other</em> bodies, (iii) resolving weight along a slope with cos instead of sin.</p></div>`
},
{
  id: 'V14', title: 'Relative Velocity', cape: 'Module 1 · 3.x (motion)', workbook: 'V14.1 – V14.17', fig: 'v14',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>The velocity of \(A\) relative to \(B\) is the velocity \(A\) appears to have to an observer moving with \(B\):</p>
\[ \vec{v}_{AB} = \vec{v}_A - \vec{v}_B \]
<p>Chaining frames: \(\vec{v}_{A\,\text{ground}} = \vec{v}_{A\,\text{water}} + \vec{v}_{\text{water ground}}\) (read it like fractions cancelling).</p></div>

<h3>River crossing</h3>
<p>Width \(w\), current \(u\), boat speed \(v\) relative to the water.</p>
<div class="figure" data-fig="v14"></div>
<ul><li><strong>Shortest time:</strong> point the boat straight across. \(t = w/v\); downstream drift \(= ut\).</li>
<li><strong>Straight across (no drift)</strong>, possible only if \(v > u\): head upstream at angle \(\alpha\) to the direct line with \(\sin\alpha = u/v\); crossing speed \(\sqrt{v^2 - u^2}\).</li></ul>

<div class="box example"><h4>Worked example</h4>
<p>A river 60 m wide flows at 1.5 m s⁻¹; the boat moves at 3.0 m s⁻¹ relative to the water.</p>
<ol class="steps"><li>Shortest time: \(t = 60/3.0 = 20\) s; drift \(= 1.5 \times 20 = 30\) m.</li>
<li>No drift: \(\sin\alpha = 1.5/3.0\) → \(\alpha = 30^\circ\) upstream. Speed across \(= \sqrt{9 - 2.25} = 2.60\ \text{m s}^{-1}\); \(t = 60/2.60 = 23.1\) s.</li></ol></div>

<h3>Aircraft and wind</h3>
<p>air velocity (heading, airspeed) + wind velocity = ground velocity (track, ground speed). Winds are named by where they come <strong>from</strong>: a wind "from the west" blows towards the east.</p>

<h3>Rain and umbrellas</h3>
<p>Rain as seen by a walker: \(\vec{v}_{\text{rain}} - \vec{v}_{\text{walker}}\). Rain falling vertically at 8.0 m s⁻¹ seen by a man walking east at 3.0 m s⁻¹ comes at \(\sqrt{64 + 9} = 8.54\ \text{m s}^{-1}\), at \(\tan^{-1}(3/8) = 20.6^\circ\) to the vertical — he tilts his umbrella forward by 20.6°.</p>

<h3>Closest approach</h3>
<p>The relative position \(\vec{r}(t) = \vec{r}_0 + \vec{v}_{\text{rel}}t\) is a straight line. The closest point occurs when \(\vec{r}\cdot\vec{v}_{\text{rel}} = 0\), giving \(t = -\dfrac{\vec{r}_0\cdot\vec{v}_{\text{rel}}}{|\vec{v}_{\text{rel}}|^2}\).</p>

<div class="box trap"><h4>Examiner's trap</h4><p>Order matters: \(\vec{v}_{AB} = \vec{v}_A - \vec{v}_B\) and \(\vec{v}_{BA} = -\vec{v}_{AB}\). Decide first whose point of view the question takes — "the rain as seen by the cyclist" is \(\vec{v}_{\text{rain}} - \vec{v}_{\text{cyclist}}\).</p></div>`
},
{
  id: 'V15', title: 'Vectors in Kinematics', cape: 'Module 1 · 3.1–3.7 projectiles; 3.18–3.26 circular motion', workbook: 'V15.1 – V15.13',
  html: String.raw`
<div class="box need"><h4>What you need</h4>
<p>Position \(\vec{r}\), velocity \(\vec{v}\) and acceleration \(\vec{a}\) are vectors. For <strong>constant acceleration</strong> the equations of motion hold as vector equations — they are just the 1-D equations applied to each component separately:</p>
\[ \vec{v} = \vec{u} + \vec{a}t, \qquad \vec{r} = \vec{r}_0 + \vec{u}t + \tfrac12\vec{a}t^2 \]
<p>(There is no vector version of \(v^2 = u^2 + 2as\) except \(\vec{v}\cdot\vec{v} = \vec{u}\cdot\vec{u} + 2\vec{a}\cdot\vec{s}\).)</p></div>

<h3>Projectiles in vector form</h3>
<p>Resolve the launch velocity into components and treat each direction separately:</p>
\[ u_x = u\cos\theta,\quad u_y = u\sin\theta; \qquad x = u_x t,\quad y = u_y t - \tfrac12gt^2; \qquad v_x = u_x,\quad v_y = u_y - gt \]
<p>Horizontal: constant velocity. Vertical: constant acceleration \(g\) downwards. At the top of the path the velocity is horizontal and the acceleration is still \(g\) downwards.</p>

<div class="box example"><h4>Worked example</h4>
<p>A particle starts at the origin with \(\vec{u} = (5,\ 2)\ \text{m s}^{-1}\) and \(\vec{a} = (-1,\ 0.5)\ \text{m s}^{-2}\). Find its velocity, speed and position after 4.0 s.</p>
<ol class="steps"><li>\(\vec{v} = (5 - 4,\ 2 + 2) = (1,\ 4)\ \text{m s}^{-1}\); speed \(= \sqrt{17} = 4.12\ \text{m s}^{-1}\).</li>
<li>\(\vec{r} = (5\cdot4 - \tfrac12\cdot16,\ 2\cdot4 + \tfrac12\cdot0.5\cdot16) = (12,\ 12)\) m.</li></ol></div>

<div class="box example"><h4>Worked example — projectile</h4>
<p>A ball is launched from ground level with \(u_x = 15\ \text{m s}^{-1}\) and \(u_y = 20\ \text{m s}^{-1}\).</p>
<ol class="steps"><li>Lands when \(20t - 4.905t^2 = 0\) → \(t = 4.08\) s.</li>
<li>Range \(= 15 \times 4.08 = 61.2\) m. Max height \(= 20^2/(2 \times 9.81) = 20.4\) m.</li>
<li>Landing velocity: \(v_x = 15\ \text{m s}^{-1}\), \(v_y = -20\ \text{m s}^{-1}\) (by symmetry) — 25 m s⁻¹ at 53.1° below the horizontal.</li></ol></div>

<p>Also: average velocity \(= \Delta\vec{r}/\Delta t\); Newton II \(\vec{F} = m\vec{a}\).</p>
<h3>With calculus (optional)</h3>
<p>\(\vec{v} = \dfrac{d\vec{r}}{dt}\), \(\vec{a} = \dfrac{d\vec{v}}{dt}\) — differentiate each component. For circular motion \(x = R\cos\omega t,\ y = R\sin\omega t\) you get \(\vec{a} = -\omega^2\vec{r}\): centripetal acceleration of size \(\omega^2 R = v^2/R\).</p>`
},
{
  id: 'V16', title: 'University Extension: Bases, Rotations, Polar Vectors, Fields', cape: 'Beyond CAPE', beyond: true, workbook: 'V16.1 – V16.8',
  html: String.raw`
<div class="box tip"><h4>Extension</h4><p>Optional for the examination, but it completes the picture for anyone going on to university physics or engineering.</p></div>
<div class="box need"><h4>What you need</h4>
<p><strong>Basis.</strong> Two non-parallel vectors in a plane (three non-coplanar vectors in space) form a basis: every vector can be written uniquely as a combination of them. The \(x\), \(y\), \(z\) axes give an <em>orthonormal</em> (mutually perpendicular) basis, which is why ordinary components are so easy to use.</p>
<p>Three vectors are linearly independent \(\iff\) their scalar triple product is non-zero.</p>
<p><strong>Rotation</strong> anticlockwise through \(\theta\): \((x, y) \mapsto (x\cos\theta - y\sin\theta,\ x\sin\theta + y\cos\theta)\). Rotations preserve lengths and dot products.</p>
<p><strong>Vector fields</strong> assign a vector to every point, e.g. \(\vec{g}(\vec{r}) = -\dfrac{GM}{|\vec{r}|^3}\vec{r}\) (magnitude \(GM/r^2\), towards the centre). Fields from several sources add as vectors (superposition).</p></div>

<div class="box example"><h4>Worked example — basis</h4>
<p>Express \(\vec{v} = (7,\ -1)\) in terms of \(\vec{a} = (1,\ 1)\) and \(\vec{b} = (2,\ -1)\).</p>
<ol class="steps"><li>\(\lambda\vec{a} + \mu\vec{b} = \vec{v}\): \(\lambda + 2\mu = 7\) and \(\lambda - \mu = -1\).</li>
<li>Subtract: \(3\mu = 8\) → \(\mu = 8/3\), \(\lambda = 5/3\).</li></ol></div>

<div class="box example"><h4>Worked example — rotation</h4>
<p>Rotate \((3,\ 4)\) through 90° anticlockwise.</p>
<ol class="steps"><li>\((3\cos90^\circ - 4\sin90^\circ,\ 3\sin90^\circ + 4\cos90^\circ) = (-4, 3)\). Length still 5 ✓.</li></ol></div>`
}
];

/* Figures referenced by data-fig in lessons */
const FIGS = {
  v2: () => U.vectors([
    { v: [4, 1], cls: 'v1', label: 'a' },
    { from: [4, 1], v: [1, 3], cls: 'v2', label: 'b' },
    { v: [5, 4], cls: 'v3', label: 'a + b', labelSide: 'left' }
  ], { axes: false, alt: 'Tip-to-tail addition' }),
  v3: () => U.vectors([
    { v: [4, 3], cls: 'v1', label: 'F', labelSide: 'left' },
    { v: [4, 0], cls: 'v2', label: 'F cosθ', dash: true },
    { from: [4, 0], v: [0, 3], cls: 'v3', label: 'F sinθ', dash: true, labelSide: 'left' }
  ], { alt: 'Resolving a vector into components' }),
  slope: () => U.slope(30),
  v4: () => U.vectors([
    { v: [3, 2], cls: 'v1', label: 'Q1 (+,+)' },
    { v: [-3, 2], cls: 'v2', label: 'Q2 (−,+)', labelSide: 'left' },
    { v: [-3, -2], cls: 'v3', label: 'Q3 (−,−)' },
    { v: [3, -2], cls: 'v4', label: 'Q4 (+,−)', labelSide: 'left' }
  ], { alt: 'The four quadrants' }),
  v6: () => U.vectors([
    { v: [5, 0], cls: 'v1', label: 'P' },
    { v: [2, 3], cls: 'v2', label: 'Q', labelSide: 'left' },
    { from: [5, 0], v: [2, 3], cls: 'v2', dash: true },
    { from: [2, 3], v: [5, 0], cls: 'v1', dash: true },
    { v: [7, 3], cls: 'v3', label: 'R' }
  ], { axes: false, alt: 'Parallelogram of vectors' }),
  v13: () => U.vectors([
    { v: [-2.2, 1.27], cls: 'v1', label: 'T₁', labelSide: 'left' },
    { v: [2.2, 3.81], cls: 'v2', label: 'T₂' },
    { v: [0, -5], cls: 'vk', label: 'W = 50 N' }
  ], { axes: false, alt: 'Three forces on a hanging lamp' }),
  v14: () => U.vectors([
    { v: [0, 3], cls: 'v1', label: 'boat v', labelSide: 'left' },
    { from: [0, 3], v: [1.5, 0], cls: 'v2', label: 'current u' },
    { v: [1.5, 3], cls: 'v3', label: 'resultant' }
  ], { axes: false, alt: 'River crossing, heading straight across' })
};

const FORMULAS_HTML = String.raw`
<div class="grid">
<div class="card"><h3>Components (V3)</h3>
\[ F_x = F\cos\theta,\quad F_y = F\sin\theta \]
<p>Slope: \(mg\sin\theta\) along, \(mg\cos\theta\) perpendicular.</p>
<p>Bearing \(\beta\): east \(= d\sin\beta\), north \(= d\cos\beta\).</p></div>
<div class="card"><h3>Magnitude & direction (V4)</h3>
\[ R = \sqrt{R_x^2 + R_y^2},\quad \alpha = \tan^{-1}\frac{|R_y|}{|R_x|} \]
<p>Q1 \(\alpha\), Q2 \(180-\alpha\), Q3 \(180+\alpha\), Q4 \(360-\alpha\).</p></div>
<div class="card"><h3>Two forces at angle θ (V6)</h3>
\[ R^2 = P^2 + Q^2 + 2PQ\cos\theta \]
\[ \tan\phi = \frac{Q\sin\theta}{P + Q\cos\theta} \]
<p>Equal forces: \(R = 2F\cos(\theta/2)\).</p></div>
<div class="card"><h3>Triangle rules</h3>
\[ c^2 = a^2 + b^2 - 2ab\cos C \]
\[ \frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} \]</div>
<div class="card"><h3>3-D vectors (V7)</h3>
\[ |\vec{a}| = \sqrt{a_x^2 + a_y^2 + a_z^2} \]
\[ \cos\alpha = \frac{a_x}{|\vec{a}|}\ \text{etc.},\ \ \textstyle\sum\cos^2 = 1 \]</div>
<div class="card"><h3>Position vectors (V8)</h3>
\[ \overrightarrow{AB} = \vec{b} - \vec{a},\quad \vec{m} = \tfrac12(\vec{a} + \vec{b}) \]
\[ AP:PB = m:n \Rightarrow \vec{p} = \frac{n\vec{a} + m\vec{b}}{m + n} \]</div>
<div class="card"><h3>Dot product (V9)</h3>
\[ \vec{a}\cdot\vec{b} = ab\cos\theta = a_xb_x + a_yb_y + a_zb_z \]
<p>\(\perp \iff \vec{a}\cdot\vec{b} = 0\). Projection \(\vec{a}\cdot\vec{b}/|\vec{b}|\). \(W = \vec{F}\cdot\vec{s}\), \(P = \vec{F}\cdot\vec{v}\).</p></div>
<div class="card"><h3>Cross product (V10)</h3>
\[ |\vec{a}\times\vec{b}| = ab\sin\theta \]
\[ \vec{a}\times\vec{b} = (a_yb_z - a_zb_y,\ a_zb_x - a_xb_z,\ a_xb_y - a_yb_x) \]
<p>\(\vec{\tau} = \vec{r}\times\vec{F}\), \(\vec{F} = q\vec{v}\times\vec{B}\). Triangle area \(\tfrac12|\overrightarrow{AB}\times\overrightarrow{AC}|\).</p></div>
<div class="card"><h3>Triple products (V11)</h3>
\[ V = |\vec{a}\cdot(\vec{b}\times\vec{c})| \]
\[ \vec{a}\times(\vec{b}\times\vec{c}) = \vec{b}(\vec{a}\cdot\vec{c}) - \vec{c}(\vec{a}\cdot\vec{b}) \]</div>
<div class="card"><h3>Lines & planes (V12)</h3>
\[ \vec{r} = \vec{a} + \lambda\vec{d},\qquad \vec{r}\cdot\vec{n} = d \]
\[ \text{dist} = \frac{|\vec{p}\cdot\vec{n} - d|}{|\vec{n}|} \]</div>
<div class="card"><h3>Equilibrium (V13)</h3>
\[ \textstyle\sum F_x = 0,\ \sum F_y = 0 \]
\[ \frac{P}{\sin\alpha} = \frac{Q}{\sin\beta} = \frac{R}{\sin\gamma} \]
<p>Friction \(F \le \mu R\).</p></div>
<div class="card"><h3>Relative velocity (V14)</h3>
\[ \vec{v}_{AB} = \vec{v}_A - \vec{v}_B \]
<p>River: \(t_{\min} = w/v\); no drift \(\sin\alpha = u/v\), speed \(\sqrt{v^2 - u^2}\).</p></div>
<div class="card"><h3>Kinematics (V15)</h3>
\[ \vec{v} = \vec{u} + \vec{a}t,\quad \vec{r} = \vec{r}_0 + \vec{u}t + \tfrac12\vec{a}t^2 \]
<p>Projectile: \(a_x = 0\), \(a_y = -g\), \(g = 9.81\ \text{m s}^{-2}\).</p></div>
<div class="card"><h3>Moments</h3>
\[ \tau = Fd_\perp = rF\sin\theta \]
<p>Moment = force × perpendicular distance from the pivot to the line of action.</p></div>
</div>`;

const CHECKLIST = [
  ['I can classify quantities as scalar or vector and define both precisely.', 'V1'],
  ['I can add and subtract vectors by scale drawing, triangle and parallelogram.', 'V2'],
  ['I can find the change in a vector (final minus initial).', 'V2'],
  ['I can resolve any vector into components, including on slopes and with angles to the vertical.', 'V3'],
  ['I can find magnitude and direction from components in every quadrant.', 'V4'],
  ['I can work with bearings.', 'V4'],
  ['I can add several vectors by a table of components.', 'V5'],
  ['I can use the cosine and sine rules for non-perpendicular vectors, and resolve along two non-perpendicular directions.', 'V6'],
  ['I can write vectors as components or column vectors, and find magnitudes and direction angles in 3-D.', 'V7'],
  ['I can use position vectors, the section formula and collinearity; write vector proofs.', 'V8'],
  ['I can compute a dot product; find angles, projections and work.', 'V9'],
  ['I can compute a cross product; find areas, normals and torques.', 'V10'],
  ['I can use the scalar and vector triple products.', 'V11'],
  ['I can write and use vector equations of lines and planes; find intersections and distances.', 'V12'],
  ['I can solve equilibrium problems by resolving and by Lami’s theorem, including friction.', 'V13'],
  ['I can solve relative-velocity problems: rivers, wind, interception, closest approach.', 'V14'],
  ['I can use vector equations of motion, including projectiles and circular motion.', 'V15'],
  ['I can (extension) work with bases, rotations and vector fields.', 'V16']
];
