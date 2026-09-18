import { DOMAIN_1_QUESTIONS, DOMAIN_2_QUESTIONS, DOMAIN_3_QUESTIONS, DOMAIN_4_QUESTIONS, DOMAIN_5_QUESTIONS } from "../src/data";
import { QUESTION_EN } from "../src/data.en";
const Q: any = {1:DOMAIN_1_QUESTIONS,2:DOMAIN_2_QUESTIONS,3:DOMAIN_3_QUESTIONS,4:DOMAIN_4_QUESTIONS,5:DOMAIN_5_QUESTIONS};
const d = Number(process.argv[2]);
const ids = process.argv[3].split(",").map(Number);
for (const id of ids) {
  const q = Q[d].find((x:any)=>x.id===id);
  if (!q) { console.log(`D${d}#${id} NOT FOUND`); continue; }
  console.log(`\n===== D${d} #${id} [${q.level}] ${q.topic}`);
  console.log("SCEN:", q.scenario);
  console.log("Q:", q.question);
  console.log("OPT:", q.options.join(" | "));
  console.log("ANS:", JSON.stringify(q.answerIndexes ?? [q.answerIndex]));
  console.log("EXPL_IT:\n", q.explanation);
  const en = QUESTION_EN[d]?.[id];
  if (en) { console.log("--- EN ---"); console.log("Q:", en.question); console.log("OPT:", (en.options||[]).join(" | ")); console.log("EXPL_EN:\n", en.explanation); }
}
