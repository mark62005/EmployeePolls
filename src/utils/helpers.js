export function formatDate(timestamp) {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString('en-US');
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function sortQuestionsIdByTimestamp(questions) {
    return questions
        .map((q) => q.id)
        .sort((a, b) => b.timestamp - a.timestamp);

    // return Object.keys(array).sort((a, b) => array[ b ].timestamp - array[ a ].timestamp);
}