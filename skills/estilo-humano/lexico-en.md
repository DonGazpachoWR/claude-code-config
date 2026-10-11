# English lexicon: AI tells and clutter

Sources: humanmade-antislop `SKILL.md` (Layer 1), Marazii research-co-pilot
(`peer-review` AI fingerprint scan, `manuscript-drafter` register audit) and
dvdsosa `sciwrite-prose` (clutter lexicon and `prose_audit.py`). The full
clutter tables with course examples are in
`~/.claude/skills/sciwrite-prose/references/clutter-lexicon.md`.

Use these as search terms, not as an automatic find-and-replace. A word on
the list can be correct in context (for example "landscape" for a fitness
landscape, "robust" for a statistical property); a word that is fine alone
becomes a tell when several cluster in one paragraph.

## Banned vocabulary

**Adjectives and adverbs.** crucial, pivotal, vital, vibrant, intricate,
meticulous, meticulously, groundbreaking, renowned, profound, enduring,
indelible, seamless, comprehensive (when vague), cutting-edge, unprecedented,
remarkable, invaluable, paramount.

**Verbs.** delve (into), underscore, highlight (meaning "emphasize"),
showcase, foster, garner, bolster, enhance (when vague), exemplify,
encompass, leverage (as "use"), harness, unlock, unveil, navigate (the
complexities of), shed light on, pave the way.

**Nouns.** tapestry, landscape (figurative), realm, interplay, intricacies,
nuances, focal point, diverse array, multifaceted nature, testament,
cornerstone, paradigm shift, synergy.

**Puffery phrases.** a testament to, serves as a reminder, reflects broader,
setting the stage for, marking a, shaping the, key turning point, evolving
landscape, deeply rooted, commitment to, in the heart of, boasts a, in
today's [adjective] world, revolutionize the field, plays a crucial/pivotal
role, holds great promise, opens new avenues.

## Connectors and fillers

- Sentence-initial *Additionally, Furthermore, Moreover, Notably,
  Importantly, Interestingly*: at most one per section, never as an
  automatic paragraph opener.
- Closers: *In conclusion, Overall, Ultimately, In summary* at the start of a
  final sentence that restates the paragraph. Cut the sentence.
- Throat-clearing to delete: it is worth noting that, it is important to
  note/remember/consider that, it should be noted/emphasized that, as is
  well known, it is well established that, needless to say, it goes without
  saying, it is generally accepted that.
- Signposting a section instead of writing it: "In this section, we will
  describe…". Write the content.

## Sentence patterns to rewrite

| Pattern | Example | Rewrite |
|---|---|---|
| Not only… but also / not just X, but Y / it is not X, it is Y | "not only accurate but also fast" | "accurate and fast", or two sentences with data |
| Trailing -ing evaluation | "…, highlighting the method's potential" | Cut, or state the finding as its own sentence |
| Copula avoidance | "serves as a hub" | "is a hub" |
| Filler triad | "robust, scalable and efficient" | The one adjective that matters, with a number |
| Stacked hedges | "may potentially suggest" | "suggests" (or the verb the evidence supports) |
| Expletive opener | "There are three genes that…" | "Three genes…" |
| Vague attribution | "Studies have shown…" | Name the studies or give N with citations |
| Announcing a table | "Table 1 shows the results." | State the finding, cite (Table 1) |
| Unnamed future work | "More research is needed." | Name the gap and the study that would close it |

## Clutter (long for short)

due to the fact that → because; in order to → to; prior to → before;
utilize → use; a number of → several; is capable of → can; in close
proximity to → near; at this point in time → now; in the event that → if;
with regard to / in terms of → about, for, or rewrite; the majority of →
most; has the ability to → can.

## Smothered verbs

perform an analysis of → analyse; conduct an assessment of → assess; provide
a description of → describe; make a decision → decide; achieve a reduction
in → reduce; carry out an investigation of → investigate. Heuristic: a
noun ending in -tion, -ment, -ance or -ity followed by "of" usually hides a
verb.

## Intensifiers

very, really, quite, basically, actually, essentially, extremely, highly,
clearly, obviously, certainly, simply, truly, fundamentally. Cut them or
replace them with a number. Reserve "significant" for its statistical sense.

## Formal register

No contractions, no conversational openers (So, Well, Now), no "a lot of",
"kind of", "figure out", "look at". Do not replace them with Latinate
inflation either ("elucidate", "engage with"): choose the plain precise
verb (determine, examine, discuss).
