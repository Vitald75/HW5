
describe('The game', function () {
    it('should get more than 100 points ', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/arkanoid.html');
        await browser.pause(1000);
        await $('button=PLAY').click();
        await browser.waitUntil(async () => {
        // player logic
       
        let ballLocationX = await $('#ball').getLocation('x');
        let padLocationX = (await $('#pad').getLocation('x')) + 60;
        if (ballLocationX > (padLocationX)) {
            await browser.keys('D');
            await browser.keys('D');
           } else if (ballLocationX < padLocationX) {
            await browser.keys('A');
            await browser.keys('A');
        }

        const points = parseInt(await $('#points').getText(), 10);
            if (points > 100) return true
            console.log({ points });
            console.log(mutationObserver.takeRecords());

        }, { timeout: 600000, interval: 10 })
    });
})
