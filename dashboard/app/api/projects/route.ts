import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const projects = JSON.parse(data);
    
    projects.push(newProject);
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
