# Auditoría de fidelidad de copy (Bloque 2)

**No aplicado en el código.** Documento para revisión del cliente. Ninguna de las discrepancias listadas abajo se corrigió — se espera confirmación antes de tocar texto.

**Fuente aprobada:** `Textos def landing DAC.docx`, hallado en `C:\Users\marcelo\Desktop\PROYECTO BUTELER\` (no estaba en la carpeta del proyecto web). Extraído y comparado frase por frase contra `index.html`.

**Hallazgo transversal, no anticipado en el brief:** el brief asumía que el numeral ("2.", "3.", "4.") en los títulos de paso era un agregado a limpiar. Verificado contra el docx, el numeral **es copy aprobado** — Frames 4–7 lo incluyen literalmente ("1. Diagnóstico Estratégico", "2. OCAPS", etc.). Lo que **no** existe en el docx en ningún Frame es el eyebrow "Paso N de la metodología": es texto agregado durante la construcción del sitio, no aprobado por el cliente en este documento. Esto invierte el diagnóstico del Bloque 1A.2 — ver detalle en esa sección más abajo. Ya resuelto en el código (numeral restituido en los cuatro títulos); el eyebrow "Paso N…" se deja intacto y se documenta aquí para decisión del cliente.

---

## FRAME HERO

| Elemento | En el HTML | En el docx aprobado | Estado |
|---|---|---|---|
| Eyebrow | "Patrimonio digital institucional" | No existe | ⚠️ Agregado, no aprobado |
| `<h1>` | "Ya no alcanza con adquirir activos digitales. El desafío es transformarlos en patrimonio." | "El desafío ya no es adquirir y custodiar activos digitales. El desafío es transformarlos en patrimonio digital:" | ⚠️ Reformulado — omite "custodiar" y "digital", cambia el arranque |
| Fact label 1 | "Bancable" | No existe | ⚠️ Agregado |
| Fact desc 1 | "Interactúa con el sistema financiero y bancario tradicional." | "Que pueda interactuar con el sistema financiero y bancario." | ⚠️ Reformulado, agrega "tradicional" |
| Fact label 2 | "Heredable" | No existe | ⚠️ Agregado |
| Fact desc 2 | "Se transmite entre generaciones sin fricción legal." | "Que sea heredable sin complicaciones." | ⚠️ Reformulado |
| Fact label 3 | "Custodiado" | No existe | ⚠️ Agregado |
| Fact desc 3 | "Resguardado bajo estándares de custodia institucional." | "Que pueda ser custodiado institucionalmente." | ⚠️ Reformulado |
| CTA primario | "Solicitar reunión estratégica" | "Solicitar reunión estratégica" | ✅ Coincide |
| Separador de socios | "Metodología desarrollada conjuntamente por" | "Metodología desarrollada conjuntamente por:" | ✅ Coincide (falta el ":" final, menor) |

**Nota:** el h1 actual es casi idéntico a una frase que sí es 100% aprobada, pero de **otro Frame** — el docx trae en Frame 8 (síntesis): *"El desafío ya no es adquirir activos digitales. El desafío es transformarlos en patrimonio."* Es posible que el hero haya heredado por error la frase de síntesis en vez de usar su propia frase de Frame Hero (que dice "adquirir **y custodiar**… patrimonio **digital**:"). Esto sugiere que la corrección más simple no es reescribir, sino **reemplazar por el texto de Frame Hero que ya existe en el docx**, no inventar redacción nueva.

No corregido: puede que Bancable/Heredable/Custodiado sean un aporte de diseño ya aceptado por el cliente fuera de este documento. Confirmar antes de tocar.

---

## FRAME 2 — Origin ("¿Por qué existimos")

Título, lede y las tres tarjetas de generación (Primera/Segunda/Tercera) coinciden palabra por palabra con el docx. ✅ Sin discrepancias.

---

## FRAME 3 — Metodología (puente)

Eyebrow "Nuestra metodología", título, subtítulo y las etiquetas de Ecosistema Digital / Ecosistema Institucional / Beneficios coinciden con el docx. ✅ Sin discrepancias. (Sección fuera de alcance para reestructurar — no se tocó el layout.)

---

## FRAME 4 — Diagnóstico Estratégico

| Elemento | Estado |
|---|---|
| Eyebrow "Paso 1 de la metodología" | ⚠️ No existe en el docx (ver nota transversal arriba) |
| Título "1. Diagnóstico Estratégico" | ✅ Coincide (corregido en 1A.2 — antes faltaba el "1.") |
| Lede, descripción, las 6 anotaciones, resultado, 5 beneficios | ✅ Coinciden palabra por palabra |

---

## FRAME 5 — OCAPS

| Elemento | Estado |
|---|---|
| Eyebrow "Paso 2 de la metodología" | ⚠️ No existe en el docx |
| Título "2. OCAPS", subtítulo "On-Chain Asset Patrimony Statement" | ✅ Coincide |
| Descripción, pregunta, checklist (6 ítems), "Proceso DAC", resultado destacado, labels de imagen (Datos de Blockchain / Identidad del Titular / Proceso DAC / Resultado) | ✅ Coinciden palabra por palabra |

---

## FRAME 6 — Estructuración Patrimonial

| Elemento | Estado |
|---|---|
| Eyebrow "Paso 3 de la metodología" | ⚠️ No existe en el docx |
| Título "3. Estructuración Patrimonial", lede, intro, 4 bullets, descripción, 5 beneficios finales | ✅ Coinciden palabra por palabra |
| Descripciones de los 5 pilares (LLCs, Sociedades internacionales, etc.) | ⚪ No verificable — ese texto está incrustado en `mobile6.png` (imagen), no en el HTML. Si el cliente pidió cambios de texto ahí, requiere reexportar el asset, no es un fix de código. |

---

## FRAME 7 — OCACS

| Elemento | Estado |
|---|---|
| Eyebrow "Paso 4 de la metodología" | ⚠️ No existe en el docx |
| Título "4. OCACS", subtítulo, lede, intro, pregunta, checklist (6 ítems), tagline final | ✅ Coinciden palabra por palabra |
| Párrafo "Resultado": *"Un informe de compliance que permite que tu patrimonio digital sea entendido, validado y aceptado por el mundo institucional."* | ❌ **Falta por completo en el HTML.** No hay ningún nodo con este texto en la sección `.ocacs`. |
| *"De los datos on-chain a la confianza off-chain."* | ❌ **Falta por completo.** Ya detectado en el brief original; confirmado contra el docx (línea final de Frame 7). |

Estos dos faltantes son candidatos claros para agregar (texto ya aprobado, simplemente no está en la página) — pero no se agregó en esta pasada porque el Bloque 2 pide reportar, no aplicar. Requiere decidir dónde va cada línea dentro de `.ocacs` (después de `.ocacs-tagline` parece el lugar natural, a confirmar con diseño ya que puede afectar el ritmo vertical de la sección).

---

## FRAME 8 — Síntesis (DAC Alliance)

| Elemento | Estado |
|---|---|
| Eyebrow "DAC Alliance" | ✅ Coincide |
| Título "From cold wallets to Wealth Structures" | ✅ Coincide (inglés confirmado intencional — ver `PROPUESTA_TITULOS.md`) |
| Lede | ✅ Coincide |
| Statement "El desafío ya no es adquirir activos digitales. El desafío es transformarlos en patrimonio." | ✅ Coincide |
| Tagline "Del caos digital a estructuras que protegen, optimizan y perduran." | ✅ Coincide |
| Alt de `8.jpg`: "…flanqueada por dos columnas…" | ⚪ Ver Bloque 4.6 del brief original — el docx no describe la imagen (es una nota para el diseñador, no copy de página), así que esto no es un tema de fidelidad de copy sino de si la metáfora visual (columnas clásicas) sigue vigente frente al símbolo de marca (prisma). Confirmar con el cliente. |
| Capacidades de Insight Trust / Molina Law Boutique (Frame 9) | ⚪ No aplica todavía — Frame 9 "Sobre nosotros" no está construido en el HTML (correctamente, está fuera de alcance de esta iteración). |

**Dato para cuando se construya Frame 9:** el docx incluye, al final, una nota del cliente ("Solo haría dos cambios antes de dárselo al diseñador") con una **redacción alternativa ya aprobada** para las descripciones de Insight Trust y Molina Law Boutique — más específica que la redacción original del mismo documento. Cuando se aborde Frame 9, usar la versión final (la de esa nota), no la primera redacción del documento.

---

## Resumen de acciones pendientes de decisión del cliente

1. **Hero:** ¿el eyebrow y las tres etiquetas (Bancable/Heredable/Custodiado) están aprobados fuera del docx, o hay que volver al texto literal? ¿El h1 se reemplaza por la frase de Frame Hero del docx (con "custodiar" y "digital")?
2. **Eyebrows "Paso N de la metodología"** (Frames 4–7): no están en el docx. ¿Se aprueban como agregado estructural, o se retiran/reemplazan?
3. **OCACS:** agregar las dos frases faltantes ("Un informe de compliance…" y "De los datos on-chain a la confianza off-chain.") — texto ya aprobado, solo falta ubicarlo.
4. **Closing/Contacto:** esta sección no tiene contraparte en el docx revisado. Confirmar si existe una fuente aprobada separada antes de tratarla como texto validado.
5. **Frame 9 (a futuro):** usar la redacción final de Insight Trust / Molina Law Boutique que el cliente ya corrigió al final del docx, no la primera versión del mismo documento.
