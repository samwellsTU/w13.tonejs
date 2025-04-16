// Set up a click handler for the first <button> element on the page
document.querySelector("button").onclick = async () => {
    // Required by Tone.js — this resumes the AudioContext on user interaction
    await Tone.start();

    // Create three monophonic synthesizers and connect them to the audio output
    const synthA = new Tone.FMSynth().toDestination();
    const synthB = new Tone.AMSynth().toDestination();
    const synthC = new Tone.AMSynth().toDestination();

    // ---- CREATE LOOPS ----

    // Loop A: triggers a low C (C2) every quarter note ("4n")
    const loopA = new Tone.Loop((time) => {
        synthA.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0); // start at beat 0

    // Loop B: triggers Eb4 every quarter note, offset by an 8th note ("8n")
    const loopB = new Tone.Loop((time) => {
        synthB.triggerAttackRelease("Eb4", "8n", time);
    }, "4n").start("8n"); // start halfway into beat

    // Loop C: triggers Ab3 every quarter note, offset by a dotted 8th ("8n.") — 3/16 note offset
    const loopC = new Tone.Loop((time) => {
        synthC.triggerAttackRelease("Ab3", "8n", time);
    }, "4n").start("8n."); // creates syncopation

    // ---- START TRANSPORT ----

    // Start the Tone.js global Transport — this starts all loops
    Tone.getTransport().start();

    // Gradually ramp the tempo to 800 BPM over 10 seconds
    Tone.getTransport().bpm.rampTo(800, 10);

    // After 20 seconds, start ramping back down to 60 BPM over 10 seconds
    setTimeout(() => {
        Tone.getTransport().bpm.rampTo(60, 10);
    }, 20000);

    // After 30 seconds total, stop the transport and all loops
    setTimeout(() => {
        Tone.getTransport().stop();
    }, 30000);
};
