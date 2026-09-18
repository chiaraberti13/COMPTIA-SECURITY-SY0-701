import { DOMAIN_1_TOPICS, DOMAIN_2_TOPICS, DOMAIN_3_TOPICS, DOMAIN_4_TOPICS, DOMAIN_5_TOPICS } from "../src/data";
const T: any = {1:DOMAIN_1_TOPICS,2:DOMAIN_2_TOPICS,3:DOMAIN_3_TOPICS,4:DOMAIN_4_TOPICS,5:DOMAIN_5_TOPICS};
for (const d of [1,2,3,4,5]) for (const g of T[d]) for (const s of g.subtopics)
  console.log(`${d}\t${s.checklistKey}\t${s.name}`);
