import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateLessonMutation } from '@/store/lesson-api';
import { useState } from 'react';
import { CreateLessonRequest } from '@pine/contracts';
import { toast } from 'sonner';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { Plus } from 'lucide-react';

const CreateLessonSchema = z.object({
  name: z.string().min(1, 'Name must not be empty'),
});
type CreateLessonFormValues = z.infer<typeof CreateLessonSchema>;

export const CreateLessonDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createLesson, { isLoading: isCreateLessonLoading }] =
    useCreateLessonMutation();

  const form = useForm<CreateLessonFormValues>({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      name: '',
    },
  });

  const setDialogOpen = (isOpen: boolean) => {
    if (isOpen) {
      form.reset({
        name: '',
      });
    }
    setIsOpen(isOpen);
  };

  const onSubmit = async (data: CreateLessonFormValues) => {
    const { error } = await createLesson(new CreateLessonRequest(data.name));
    if (error) {
      toast('Failed to create lesson');
      return;
    }
    setDialogOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button leftElement={<Plus />}>Create lesson</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Create lesson</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" isLoading={isCreateLessonLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
