import fs from 'fs';
import path from 'path';

/**
 * AdamOS Lightweight API Router (V1 Testing)
 * This script demonstrates how we can load the Universal Tool Schemas
 * from the skills_library and pass them to OpenAI/Anthropic APIs directly,
 * bypassing the Hermes runtime for fast, lightweight inference.
 */

const SKILLS_DIR = path.resolve('../../skills_library/approved');

function loadSkills() {
  const tools = [];
  const files = fs.readdirSync(SKILLS_DIR);
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const toolDef = JSON.parse(fs.readFileSync(path.join(SKILLS_DIR, file), 'utf-8'));
      tools.push({
        type: "function",
        function: toolDef
      });
    }
  }
  return tools;
}

export async function chatWithAgent(message, model = "gpt-4o-mini") {
  const tools = loadSkills();
  
  console.log(`[Router] Initializing chat with ${model}...`);
  console.log(`[Router] Loaded ${tools.length} Universal Skills.`);
  
  // Here we would use the official OpenAI or Anthropic SDK:
  /*
  const response = await openai.chat.completions.create({
    model: model,
    messages: [{ role: "user", content: message }],
    tools: tools,
    tool_choice: "auto"
  });
  return response;
  */
  
  return { status: "success", mock_response: `Mock response from ${model} using tools.` };
}

// Simple test
// chatWithAgent("Read my personal goals from the wiki");
