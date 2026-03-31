type Task = {
    id: number;
    text: string;
};

let tasks: Task[] = [];
let id = 1;
//GET
export async function GET() {
    return Response.json({ tasks });
}
//POST
export async function POST(req: Request) {
    const body = await req.json();

    const newTask: Task = {
        id: id++,
        text: body.task,
    };
    tasks.push(newTask);

    return Response.json({ success:true });
}

//DELETE
export async function DELETE(req: Request) {
    const { searchParams} = new URL(req.url);
    const idToDelete = Number(searchParams.get("id"));

    tasks = tasks.filter((t) => t.id !== idToDelete);

    return Response.json({success:true});
}