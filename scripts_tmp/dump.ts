import * as fs from "fs";
import { DOMAIN_1_QUESTIONS, DOMAIN_2_QUESTIONS, DOMAIN_3_QUESTIONS, DOMAIN_4_QUESTIONS, DOMAIN_5_QUESTIONS,
  DOMAIN_1_TOPICS, DOMAIN_2_TOPICS, DOMAIN_3_TOPICS, DOMAIN_4_TOPICS, DOMAIN_5_TOPICS } from "../src/data";
import { QUESTION_EN, SUBTOPIC_EN } from "../src/data.en";

const Q: any = {1:DOMAIN_1_QUESTIONS,2:DOMAIN_2_QUESTIONS,3:DOMAIN_3_QUESTIONS,4:DOMAIN_4_QUESTIONS,5:DOMAIN_5_QUESTIONS};
const T: any = {1:DOMAIN_1_TOPICS,2:DOMAIN_2_TOPICS,3:DOMAIN_3_TOPICS,4:DOMAIN_4_TOPICS,5:DOMAIN_5_TOPICS};
const out = process.argv[2];
const counts: any = {};
for (const d of [1,2,3,4,5]) {
  counts[d] = { questions: Q[d].length, groups: T[d].length, subtopics: T[d].reduce((a:number,g:any)=>a+g.subtopics.length,0),
    enQ: Object.keys(QUESTION_EN[d]||{}).length, enS: Object.keys(SUBTOPIC_EN[d]||{}).length };
  const lines: string[] = [];
  for (const q of Q[d]) {
    const en = QUESTION_EN[d]?.[q.id];
    lines.push(`\n===== D${d} #${q.id} [${q.level}] topic=${q.topic}`);
    lines.push(`SCEN_IT: ${q.scenario}`);
    lines.push(`Q_IT: ${q.question}`);
    q.options.forEach((o:string,i:number)=>lines.push(`  ${i===q.answerIndex||q.answerIndexes?.includes(i)?"*":" "} ${o}`));
    lines.push(`ANSWER: ${JSON.stringify(q.answerIndexes ?? [q.answerIndex])}`);
    lines.push(`EXPL_IT: ${q.explanation}`);
    if (en) {
      lines.push(`SCEN_EN: ${en.scenario ?? "(none)"}`);
      lines.push(`Q_EN: ${en.question ?? "(none)"}`);
      (en.options ?? []).forEach((o:string)=>lines.push(`   ${o}`));
      lines.push(`EXPL_EN: ${en.explanation ?? "(none)"}`);
    } else lines.push("EN: (missing)");
  }
  fs.writeFileSync(`${out}/D${d}_questions.txt`, lines.join("\n"));
  const tl: string[] = [];
  for (const g of T[d]) {
    tl.push(`\n##### GROUP: ${g.title} | ${g.description}`);
    for (const s of g.subtopics) {
      const e = SUBTOPIC_EN[d]?.[s.checklistKey];
      tl.push(`\n--- ${s.checklistKey} | name=${s.name}`);
      tl.push(`DEF_IT: ${s.definition}`);
      tl.push(`DET_IT: ${s.details}`);
      tl.push(`TIP_IT: ${s.examTip}`);
      if (s.keyFormulas) tl.push(`FORM_IT: ${JSON.stringify(s.keyFormulas)}`);
      if (s.comparativeTable) tl.push(`TAB_IT: ${JSON.stringify(s.comparativeTable)}`);
      if (e) {
        tl.push(`DEF_EN: ${e.definition ?? "(none)"}`);
        tl.push(`DET_EN: ${e.details ?? "(none)"}`);
        tl.push(`TIP_EN: ${e.examTip ?? "(none)"}`);
        if (e.keyFormulas) tl.push(`FORM_EN: ${JSON.stringify(e.keyFormulas)}`);
        if (e.comparativeTable) tl.push(`TAB_EN: ${JSON.stringify(e.comparativeTable)}`);
      } else tl.push("EN: (missing)");
    }
  }
  fs.writeFileSync(`${out}/D${d}_topics.txt`, tl.join("\n"));
}
console.log(JSON.stringify(counts, null, 2));
