import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface ArticleFormData {
	author: string;
	title: string;
	content: string;
}

const ArticleForm = () => {
	const { register, handleSubmit } = useForm<ArticleFormData>();
	const params = useParams();
	console.log('PARAMS,', params);
	
	const onSubmit = (data: ArticleFormData) => {
		console.log('DATA', data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-md rounded-md bg-gradient-to-b from-customYellow via-customPurple to-customDarkBlue p-4">
			<label className="flex h-10 p-2 mb-4 text-white" htmlFor="author">
				<span className="min-w-24">Author</span>
				<input {...register("author", { required: true })} className="outline ml-4 flex-1" />
			</label>
			<label className="flex h-10 p-2 mb-4 text-white" htmlFor="title">
				<span className="min-w-24">Title</span>
				<input {...register("title", { required: true })} className="outline ml-4 flex-1" />
			</label>
			<label className="flex h-10 p-2 mb-4 text-white" htmlFor="content">
				<span className="min-w-24">Content</span>
				<input {...register("content", { required: true })} className="outline ml-4 flex-1" />
			</label>
			<button type="submit" className="text-white rounded-md border border-white border-solid">Submit</button>
		</form>
	);
}

export default ArticleForm;