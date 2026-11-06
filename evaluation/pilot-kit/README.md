# Pilot kit: run one pilot in about 45 minutes

Anyone on the team can run a pilot with this folder. You need a laptop that belongs to the participant, this kit printed or open on a second screen, and a timer. No participant is asked for a password, a student ID or a personal file.

## What a pilot measures

The scope says a pilot passes when a novice finishes the setup without the operator typing commands, scores at least 8 of 10 on the post-lab quiz, and gains at least 3 points over their pre-lab score. Record every attempt, including failures and people who already scored high before the lab.

## Before the session (5 minutes)

1. Ask for consent. Say what is recorded (times, scores, where they got stuck, your notes) and when it is deleted. Use an alias such as P3, never a name.
2. Check that the participant is a target user: no prior local-model setup. Record what they say.
3. Confirm the laptop: operating system, whether Python 3.11 or newer is already installed, and that they have 10 GB of free disk. Do not prepare the laptop for them. Note in the record if it was already prepared.
4. Open the public site, open `quiz-and-key.md` for yourself, and start a fresh `timing-log.md` and `observation-sheet.md` for this participant.

## During the session (35 minutes)

1. **Pre-lab quiz.** Learn page, "Start pre-lab check". The site shows only the score. Write it in the timing log.
2. **The lab.** The participant works alone. Read the rules below. Start the timer when they click the first Download button and stop it when the Say hello step shows a reply.
3. **Post-lab quiz.** Learn page, "Start post-lab check". Write the score and which questions were missed.
4. **Two questions, out loud.** Ask them to explain one trade-off ("why start with a small model?") and to point at where the model lives on their laptop. Record yes or no on the observation sheet.

## Rules for the operator

- Never touch the keyboard and never type a command. If they are stuck, say "read the card again" once. If they are still stuck after two minutes, count a help request, give the smallest hint that unblocks them, and write down exactly where they were.
- Do not answer quiz questions or explain concepts during the lab. The site must do the teaching.
- If a step asks for a password or an admin prompt, stop the pilot there and record it. That is a finding, not a failure of the participant.

## After the session (5 minutes)

1. Fill one row of `../templates/pilot-record.csv` from the timing log and observation sheet.
2. Ask the participant whether to keep what the lab added. If not, use Undo in My lab for the model and delete the lab folder. Their receipt (My lab, Download receipt) lists everything.
3. Put the three sheets and the record row in the private results folder, not in the repository.

## Files in this kit

| File | Use |
|---|---|
| `quiz-and-key.md` | The frozen ten questions with the answer key. Do not change the wording during the pilots, or the scores stop being comparable. |
| `observation-sheet.md` | One per participant: where they got stuck, help requests, the two out-loud questions. |
| `timing-log.md` | One per participant: minutes per stage and quiz scores. |
| `../templates/pilot-record.csv` | One row per participant, the file the final report reads. |
