# The knowledge check, with its key

These are the ten questions the site asks before and after the lab, word for word. The site hides the answers on the pre-lab check and shows them only after the post-lab check. Keep this file away from participants. Do not change the wording while pilots are running; a test in `portal/tests` checks that this file matches the site.

Scoring: one point per correct answer, 10 points total. Target after the lab: at least 8, and at least 3 more than before.

## 1. You type a question into a model running on your laptop. Where do your words go?
- To the company that made the model, which sends an answer back
- Nowhere else. They stay on your laptop
- To Ollama’s website, which does the thinking
- To the cloud, but only while you have internet

**Answer:** Nowhere else. They stay on your laptop

## 2. What is the difference between Ollama and the model file you download?
- Ollama is the engine that runs models; the model is a file of learned numbers
- They are the same thing with two names
- Ollama is the model; the file is a backup of its settings
- The model file is the program; Ollama is just the folder it sits in

**Answer:** Ollama is the engine that runs models; the model is a file of learned numbers

## 3. Your laptop has 8 GB of memory. Which of these should you start with?
- The biggest model, because bigger is always better
- A small model, about 1 to 2 billion parameters
- Any model. Memory only changes the download time
- None. No model runs on 8 GB

**Answer:** A small model, about 1 to 2 billion parameters

## 4. What does the “Download a model” step add to your laptop, and how do you undo it?
- One model file in Ollama’s folder. Click Undo, or run ollama rm
- A new app in Applications. Drag it to the Trash
- Changes to system settings. Reinstall your system to undo them
- Files in many folders. It cannot be undone

**Answer:** One model file in Ollama’s folder. Click Undo, or run ollama rm

## 5. A setup step asks for your admin password, or to turn off a security setting. What do you do?
- Type it in. Setup usually needs it
- Turn security off for a minute, then turn it back on
- Stop. This lab never needs it. Ask the team
- Skip that step and carry on with the next one

**Answer:** Stop. This lab never needs it. Ask the team

## 6. A local model gives a confident answer that turns out to be wrong. Why can that happen?
- It predicts the next likely token. It does not look facts up
- It lost internet, so it could not check
- The download was damaged on the way
- Small models give wrong answers on purpose

**Answer:** It predicts the next likely token. It does not look facts up

## 7. The lab reports “18 tokens per second”. In plain words, what does that tell you?
- How fast the reply appears. Tokens are pieces of words
- How many questions you can ask each second
- How much memory the model is using
- How accurate the answers are

**Answer:** How fast the reply appears. Tokens are pieces of words

## 8. Before measuring, the lab asks you to guess the speed and memory. Why guess first?
- Your guess is used to set the model up
- A guess gives the measurement something to teach you
- The lab needs a number to start its timer
- A good guess earns a higher quiz score

**Answer:** A guess gives the measurement something to teach you

## 9. The model runs, but each reply crawls out very slowly. What is the most likely reason?
- Your internet connection is slow
- Too little free memory for its size, often because other apps are open
- The model file did not download properly
- The model needs a license before it runs at full speed

**Answer:** Too little free memory for its size, often because other apps are open

## 10. You click “Show on my laptop” for a downloaded model. What opens, and what should you not do?
- Ollama’s models folder, with a file named by a code. Don’t move or rename it
- A text file of the model’s past answers. Don’t share it
- A file named after the model. Rename it to anything you like
- The Ollama app’s settings. Don’t change them

**Answer:** Ollama’s models folder, with a file named by a code. Don’t move or rename it
