# Grade 11 learning-system research notes

This upgrade uses the official CBSE curriculum documents as a coverage check and learning-science guidance as an interaction check. The existing JEE depth remains available in the reference notes, but a learner now meets the core model first.

## Scope anchors

- [CBSE Senior Secondary curriculum portal](https://cbseacademic.nic.in/curriculum_2026.html)
- [CBSE Physics curriculum](https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Physics_SrSec_2025-26.pdf)
- [CBSE Chemistry curriculum](https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Chemistry_SrSec_2025-26.pdf)
- [CBSE Mathematics curriculum](https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Maths_SrSec_2025-26.pdf)

The chapter guide preserves the Class 11 Physics sequence from units and kinematics through waves, the Chemistry foundation from mole concepts through hydrocarbons, and the Mathematics foundation from sets and functions through probability. The subject lenses are deliberately aligned with the way each subject represents meaning:

- Physics: situation → diagram/vector → law → equation → units and limiting check.
- Chemistry: observable change → particles/orbitals → symbolic structure → calculation.
- Mathematics: given/asked → structure and restrictions → method → algebra/proof → verification.

## Simulation design choice

[PhET’s research summary](https://phet.colorado.edu/en/research) reports that interactive simulations can improve conceptual understanding, while also making clear that simulations do not replace the equipment-handling skills of a physical lab. Its design work emphasizes testing with student think-alouds and using guided inquiry/scaffolding rather than leaving learners with an unexplained control panel.

That is why each lab now asks the student to:

1. predict a direction before changing a control;
2. change one variable at a time;
3. compare the live visual, readout, and formula;
4. explain the result in plain language; and
5. transfer the idea to a new situation in a notebook-sized response.

The same guided-inquiry pattern now runs inside theory. Dense headings are decomposed into topic-sized lessons so a student can learn one idea, retrieve it, and then connect it to the next idea. The visible teaching unit is therefore smaller than the source note, but the source note, derivation, exceptions, and exam traps remain one click away.

The simulations are deterministic teaching models. They label assumptions, keep units or sign conventions visible where relevant, and do not present simulated values as substitutes for hands-on measurement.

## Demonstration and assessment research

The new lesson sequence uses a worked example before an independent transfer question. This follows the worked-example effect described by Sweller and Cooper: studying a complete, explained solution can reduce unproductive search while a learner is still building the schema, after which the learner should solve a similar problem with less support. The primary paper is [Learning from Worked Examples](https://doi.org/10.1207/s15516709cog1202_4).

The question cards therefore move from prediction to demonstration to retrieval. A student first commits to a model or first move, then reveals the calculation one step at a time, then answers a fresh question with feedback. This is also consistent with retrieval-practice findings summarized by the [Learning Scientists](https://www.learningscientists.org/blog/2016/6/23-6), while keeping the feedback visible so an incorrect choice repairs the model instead of becoming a guess.

For exam realism, the paper UI is informed by the [JEE Main 2026 Information Bulletin](https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2025/11/202511021649722475.pdf): Paper 1 uses objective multiple-choice questions and numerical-value questions, with +4 for a correct response, −1 for an incorrect response, and 0 for an unanswered response. The production papers retain their existing classroom marks and written questions, but add a first-move choice before each written response. That creates JEE-like option practice without pretending that a board answer can be replaced by a guess. The [JEE Advanced FAQ](https://jeeadv.ac.in/faq.html) is kept as the official reference for the current Advanced pattern, which can vary by year.

This creates a deliberate ladder inside each chapter:

1. Predict the representation or first move.
2. Watch a worked demonstration with the answer hidden until the reasoning is visible.
3. Retrieve the definition or relationship from memory.
4. Transfer it to a changed condition in a JEE-style choice question.
5. Write and self-mark the longer board-style response.
