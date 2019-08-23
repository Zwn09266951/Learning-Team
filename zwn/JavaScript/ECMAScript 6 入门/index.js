const log = i => {
    console.log(i);
    if (i + 1 < 10) {
        log(i + 1)
    }
    console.log(i)
}
log(0)