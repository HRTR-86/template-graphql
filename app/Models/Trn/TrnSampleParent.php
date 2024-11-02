<?php declare(strict_types=1);

namespace App\Models\Trn;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class TrnSampleParent extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $table = 'trn_sample_parent';

    protected $fillable = [
        'name',
        'status_id',
        'datetime',
        'created_by',
        'updated_by',
        'deleted_at',
    ];

    protected array $dates = ['deleted_at'];

    /**
     * @return HasManyThrough
     */
    public function trnSampleChild(): HasManyThrough
    {
        return $this->hasManyThrough(
            TrnSampleChild::class,
            TrnSampleRelation::class,
            'parent_id',
            'id',
            'id',
            'child_id'
        );
    }
}
