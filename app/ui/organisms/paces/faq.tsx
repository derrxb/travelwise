import { faqs } from '~/content/paces/en.json';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/ui/atoms/accordion';

export const FrequentlyAskedQuestions = () => {
  return (
    <Accordion type="single" collapsible>
      {faqs.map((faq) => (
        <AccordionItem value={faq.question}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
