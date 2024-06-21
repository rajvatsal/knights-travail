import Q from "./Queue.mjs";

function knightsPath(start, end) {
	let node = { data: start, parent: null };
	const queue = Q(node);
	while (queue.getLength() > 0) {
		if (isSamePosition(node.data, end)) {
			const backTrace = [];
			let path = node;
			while (path.parent !== null) {
				backTrace.push(path.data);
				path = path.parent;
			}
			return backTrace.reverse();
		}
		const adjacencyList = getAdjacent(node);
		queue.dequeue();
		queue.enqueue(...adjacencyList);
		node = queue.getFirst();
	}
}

function getPossibleMoves([x, y]) {
	return [
		[x + 2, y + 1],
		[x + 2, y - 1],
		[x - 2, y + 1],
		[x - 2, y - 1],
		[x + 1, y + 2],
		[x - 1, y + 2],
		[x + 1, y - 2],
		[x - 1, y - 2],
	];
}

function isSamePosition(a1, a2) {
	return a1[0] === a2[0] && a1[1] === a2[1];
}

function getAdjacent(obj) {
	const moves = getPossibleMoves(obj.data).filter(([x, y]) => {
		if (!(x >= 0 && x <= 7 && y >= 0 && y <= 7)) return false;
		if (obj.parent !== null && isSamePosition(obj.parent.data, [x, y]))
			return false;
		return true;
	});
	return moves.map((move) => ({
		data: move,
		parent: obj,
	}));
}

const header = `
 ___  __    ________   ___  ________  ___  ___  _________  ________           _________  ________  ________  ___      ___ ________  ___  ___          
|\\  \\|\\  \\ |\\   ___  \\|\\  \\|\\   ____\\|\\  \\|\\  \\|\\___   ___\\\\   ____\\         |\\___   ___\\\\   __  \\|\\   __  \\|\\  \\    /  /|\\   __  \\|\\  \\|\\  \\         
\\ \\  \\/  /|\\ \\  \\\\ \\  \\ \\  \\ \\  \\___|\\ \\  \\\\\\  \\|___ \\  \\_\\ \\  \\___|_        \\|___ \\  \\_\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\  /  / | \\  \\|\\  \\ \\  \\ \\  \\        
 \\ \\   ___  \\ \\  \\\\ \\  \\ \\  \\ \\  \\  __\\ \\   __  \\   \\ \\  \\ \\ \\_____  \\            \\ \\  \\ \\ \\   _  _\\ \\   __  \\ \\  \\/  / / \\ \\   __  \\ \\  \\ \\  \\       
  \\ \\  \\\\ \\  \\ \\  \\\\ \\  \\ \\  \\ \\  \\|\\  \\ \\  \\ \\  \\   \\ \\  \\ \\|____|\\  \\            \\ \\  \\ \\ \\  \\\\  \\\\ \\  \\ \\  \\ \\    / /   \\ \\  \\ \\  \\ \\  \\ \\  \\____  
   \\ \\__\\\\ \\__\\ \\__\\\\ \\__\\ \\__\\ \\_______\\ \\__\\ \\__\\   \\ \\__\\  ____\\_\\  \\            \\ \\__\\ \\ \\__\\\\ _\\\\ \\__\\ \\__\\ \\__/ /     \\ \\__\\ \\__\\ \\__\\ \\_______\\
    \\|__| \\|__|\\|__| \\|__|\\|__|\\|_______|\\|__|\\|__|    \\|__| |\\_________\\            \\|__|  \\|__|\\|__|\\|__|\\|__|\\|__|/       \\|__|\\|__|\\|__|\\|_______|
                                                             \\|_________|                                                                             
`;

export default function kinghtMoves(start, end) {
	console.log(header);
	const moves = knightsPath(start, end);
	console.log(`You made it in ${moves.length} moves! Here\'s your path:`);
	moves.forEach((move) => console.log(move));
}
