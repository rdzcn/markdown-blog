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
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
			<label className="flex h-10 p-2 mb-4" htmlFor="author">
				<span className="min-w-72">Author</span>
				<input {...register("author", { required: true })} className="outline ml-4" />
			</label>
			<label className="flex h-10 p-2 mb-4" htmlFor="title">
				<span className="min-w-72">Title</span>
				<input {...register("title", { required: true })} className="outline ml-4" />
			</label>
			<label className="flex h-10 p-2 mb-4" htmlFor="content">
				<span className="min-w-72">Content</span>
				<input {...register("content", { required: true })} className="outline ml-4" />
			</label>
			<button type="submit" className="">Submit</button>
		</form>
	);
}

export default ArticleForm;