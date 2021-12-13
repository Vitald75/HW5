
describe('The game', function () {
    it('should get more than 100 points ', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/arkanoid.html');
        await browser.pause(1000);
        await $('button=PLAY').click();
        await browser.waitUntil(async () => {
        // player logic
        let delta = (await $('#ball').getLocation('x')) - (await $('#pad').getLocation('x')) - 60;
        let key = (delta > 0) ? 'D' : 'A';
        await browser.keys(key);
        if (Math.abs(delta) > 20) {
            await browser.keys(key);
        }
        const points = parseInt(await $('#points').getText(), 10);
        if (points > 100) return true
        console.log({ points });
      }, { timeout: 600000, interval: 10 })
    });
})
